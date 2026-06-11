import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY ?? "")
  .replace(/^["\s]+|["\s]+$/g, "")
  .replace(/\\n/g, "\n");

const RATE_LIMIT_MS = 60_000;
const DUPLICATE_WINDOW_MS = 5 * 60_000;
const COOKIE_COOLDOWN_S = 30;
const MAX_BODY_BYTES = 2048;
const MIN_FORM_TIME_MS = 4000;

const submissions = new Map<string, number[]>();
const guidSubmissions = new Map<string, number[]>();

function getIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(key: string, store: Map<string, number[]>, windowMs: number): boolean {
  const now = Date.now();
  const timestamps = (store.get(key) || []).filter((t) => now - t < windowMs);
  store.set(key, timestamps);
  return timestamps.length > 0;
}

function recordSubmission(key: string, store: Map<string, number[]>) {
  const now = Date.now();
  const timestamps = store.get(key) || [];
  timestamps.push(now);
  store.set(key, timestamps);
}

function sanitize(val: string): string {
  return val
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

const FIELD_LIMITS: Record<string, { max: number; label: string }> = {
  nombreApellido: { max: 80, label: "Nombre y apellido" },
  usuarioDiscord: { max: 50, label: "Usuario de Discord" },
  nombreAssetto: { max: 50, label: "Nombre en Assetto Corsa" },
  steamGuid: { max: 30, label: "Steam GUID" },
};

function validateField(val: unknown, key: string): string | null {
  if (typeof val !== "string" || val.trim().length === 0) {
    return `${FIELD_LIMITS[key]?.label ?? "Campo"} es obligatorio`;
  }
  const trimmed = val.trim();
  if (trimmed.length > FIELD_LIMITS[key].max) {
    return `${FIELD_LIMITS[key].label} no puede superar los ${FIELD_LIMITS[key].max} caracteres`;
  }
  return null;
}

function isValidSteamGuid(val: string): boolean {
  return /^\d{17}$/.test(val.trim());
}

async function getAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const expiry = now + 3600;

  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const payload = {
    iss: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: expiry,
  };

  const base64url = (data: object | string) =>
    Buffer.from(typeof data === "string" ? data : JSON.stringify(data))
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

  const unsignedJwt = `${base64url(header)}.${base64url(payload)}`;

  const { createSign } = await import("crypto");
  const sign = createSign("RSA-SHA256");
  sign.update(unsignedJwt);
  const signature = sign.sign(GOOGLE_PRIVATE_KEY!, "base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

  const jwt = `${unsignedJwt}.${signature}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) {
    console.error("Google OAuth error:", JSON.stringify(tokenData));
    throw new Error("No se pudo obtener el access token de Google");
  }
  return tokenData.access_token;
}

export async function POST(request: NextRequest) {
  try {
    if (request.method !== "POST") {
      return NextResponse.json({ error: "Método no permitido" }, { status: 405 });
    }

    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Content-Type inválido" }, { status: 415 });
    }

    const contentLength = parseInt(request.headers.get("content-length") ?? "0", 10);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Solicitud demasiado grande" }, { status: 413 });
    }

    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Solicitud demasiado grande" }, { status: 413 });
    }

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
    }

    const { honeypot, formMounted } = body;

    if (honeypot) {
      return NextResponse.json({ error: "Solicitud rechazada" }, { status: 400 });
    }

    if (formMounted && typeof formMounted === "number") {
      const elapsed = Date.now() - formMounted;
      if (elapsed < MIN_FORM_TIME_MS) {
        return NextResponse.json({ error: "Solicitud rechazada" }, { status: 400 });
      }
    }

    const { nombreApellido, usuarioDiscord, nombreAssetto, steamGuid } = body as Record<string, unknown>;

    const fieldErrors: string[] = [];
    for (const key of ["nombreApellido", "usuarioDiscord", "nombreAssetto", "steamGuid"] as const) {
      const err = validateField(body[key], key);
      if (err) fieldErrors.push(err);
    }

    if (fieldErrors.length > 0) {
      return NextResponse.json({ error: fieldErrors.join(". ") }, { status: 400 });
    }

    if (!isValidSteamGuid(steamGuid as string)) {
      return NextResponse.json(
        { error: "Steam GUID inválido — debe ser un número de 17 dígitos" },
        { status: 400 }
      );
    }

    const ip = getIp(request);

    if (isRateLimited(ip, submissions, RATE_LIMIT_MS)) {
      return NextResponse.json(
        { error: "Debés esperar un momento antes de enviar otra inscripción" },
        { status: 429 }
      );
    }

    const guidKey = (steamGuid as string).trim().toLowerCase();
    if (isRateLimited(guidKey, guidSubmissions, DUPLICATE_WINDOW_MS)) {
      return NextResponse.json(
        { error: "Este Steam GUID ya fue registrado recientemente" },
        { status: 429 }
      );
    }

    const cookieSubmitted = request.cookies.get("ccc_submitted")?.value;
    if (cookieSubmitted) {
      return NextResponse.json(
        { error: "Debés esperar antes de enviar otra inscripción" },
        { status: 429 }
      );
    }

    if (!GOOGLE_SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      console.error("Faltan variables de entorno de Google Sheets");
      return NextResponse.json(
        { error: "Error de configuración del servidor" },
        { status: 500 }
      );
    }

    const accessToken = await getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };

    const metaRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}?fields=sheets.properties`,
      { headers }
    );
    const metaData = await metaRes.json();
    const sheetName = metaData.sheets?.[0]?.properties?.title;

    if (!sheetName) {
      return NextResponse.json(
        { error: "Error al obtener la hoja de cálculo" },
        { status: 500 }
      );
    }

    const now = new Date();
    const fechaInscripcion = now.toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const values = [[
      fechaInscripcion,
      sanitize(nombreApellido as string),
      sanitize(usuarioDiscord as string),
      sanitize(nombreAssetto as string),
      (steamGuid as string).trim(),
    ]];

    const range = `'${sheetName}'!A:E`;

    const sheetRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ values }),
      }
    );

    if (!sheetRes.ok) {
      const errData = await sheetRes.json();
      console.error("Google Sheets error:", errData);
      return NextResponse.json(
        { error: "Error al guardar la inscripción" },
        { status: 500 }
      );
    }

    recordSubmission(ip, submissions);
    recordSubmission(guidKey, guidSubmissions);

    const response = NextResponse.json({ success: true, message: "Inscripción registrada correctamente" });
    response.cookies.set("ccc_submitted", "1", {
      maxAge: COOKIE_COOLDOWN_S,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });
    return response;
  } catch (error) {
    console.error("Error en API inscripción:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
