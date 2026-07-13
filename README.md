# 🏁 Copa Chapa Chapa — Web Oficial

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React 19](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

> **Copa Chapa Chapa** es un campeonato argentino de simracing disputado en **Assetto Corsa**, con formato de splits, más de 70 pilotos y transmisión en vivo por Twitch. Este sitio es la plataforma oficial del campeonato: resultados, estadísticas, calendario e inscripciones.

---

## 📖 Sobre el proyecto

Plataforma web oficial de la **Copa Chapa Chapa**, un campeonato de simracing que reúne a pilotos de toda Argentina. El sitio centraliza la información del campeonato: clasificaciones en tiempo real, historial de resultados por split, tabla de equipos, calendario de fechas, perfil de campeones y formulario de inscripción con protecciones anti-spam.

Diseñado con una estética **motorsport oscura** — tipografía bold, paleta de alto contraste con acentos dorados, y una experiencia que refleja la seriedad y la pasión del automovilismo virtual argentino.

---

## ✨ Funcionalidades

### 🏠 Home (`/`)
- **Hero** con banner, stats (+60 pilotos, 4 fechas, 4 circuitos)
- **Top 5** de la clasificación general
- Navegación rápida a las secciones principales

### 🏆 Clasificación (`/copa-chapa-chapa`)
- **Podio** con los 3 primeros de la temporada
- **Tabla general** completa con puntuación por fecha y split
- **Buscador** de pilotos en tiempo real
- **Paginación** en tabla general y equipos
- **Resultados por fecha** con tabs interactivos
- **Campeonato de equipos** con detalle de pilotos por equipo
- Indicadores de **variación de posición** (↑ ↓ —)

### 📋 El Campeonato (`/campeonato`)
- Información general: formato, splits, sistema de puntuación
- **Sistema de puntos** (1° → 25 pts, 12° → 1 pt)
- **Reglamento completo** (8 normas de competencia)
- Sección de **organizadores** con links a Twitch

### 📅 Calendario (`/calendario`)
- Las 4 fechas con estado (disputada / próxima)
- Circuito, ubicación y ganadores por split
- Formato y horarios de cada fecha

### 👑 Campeones (`/campeones`)
- Cards de campeones por temporada
- **Modal interactivo** con estadísticas detalladas
- Resultados fecha por fecha del campeón

### 📝 Inscripción (`/inscripcion`)
- Formulario con **honeypot anti-spam**, validación de tiempo mínimo y cooldown
- Envío asíncrono a API route
- Links de descarga de circuito y auto

### 🔒 Splits (`/splits`)
- Sección bloqueada fuera de temporada activa

### ⚙️ Backend
- **API Route** `/api/inscripcion` para procesar formularios
- **Anti-spam**: honeypot oculto, validación temporal, cooldown de 10 segundos

---

## 🛠 Stack tecnológico

| Tecnología | Uso |
|---|---|
| **Next.js 16** | Framework con App Router |
| **TypeScript** | Tipado estricto en toda la codebase |
| **React 19** | UI con componentes Server y Client |
| **CSS** | Estilos globales con variables CSS (`globals.css`) |
| **Vercel Analytics** | Métricas de visitas |
| **Vercel Speed Insights** | Monitoreo de rendimiento |

---

## 📊 Datos del campeonato

| Dato | Valor |
|---|---|
| **Simulador** | Assetto Corsa |
| **Temporada activa** | Temporada 1 (2026) |
| **Pilotos** | +70 inscriptos |
| **Fechas** | 4 (Comodoro, Buenos Aires, La Pampa, La Plata) |
| **Formato** | 2 splits por fecha |
| **Sistema de puntos** | Top 12 por split (25 → 1 pt) |
| **Transmisión** | Twitch — @tomikka / @maticunial |

---

## 🏆 Créditos

- **Tomikka** — Fundador & Organizador ([Twitch](https://twitch.tv/tomikka))
- **Maticunial** — Fundador & Organizador ([Twitch](https://twitch.tv/maticunial))
- Desarrollo web independiente

---

<p align="center">
  <i>Next.js 16 · TypeScript · React 19 · CSS · Assetto Corsa</i>
</p>
