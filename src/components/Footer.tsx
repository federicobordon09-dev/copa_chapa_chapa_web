import Link from "next/link";

interface FooterProps {
  /** Show Organizadores column instead of Contacto */
  showOrganizadores?: boolean;
}

export default function Footer({ showOrganizadores }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-name">
              COPA <span>CHAPA</span> CHAPA
            </div>
            <p className="footer-tagline">
              Pilotos de verdad, carreras que se sienten. 2026 ya está en juego.
            </p>
          </div>
          <div className="footer-col">
            <div className="footer-heading">Páginas</div>
            <ul className="footer-links">
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/campeonato">Campeonato</Link></li>
              <li><Link href="/copa-chapa-chapa">Copa Chapa Chapa</Link></li>
              <li><Link href="/calendario">Calendario</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            {showOrganizadores ? (
              <>
                <div className="footer-heading">Organizadores</div>
                <ul className="footer-links">
                  <li><a href="https://www.twitch.tv/tomikka" target="_blank" rel="noopener noreferrer">Twitch · Tomikka</a></li>
                  <li><a href="https://www.twitch.tv/maticunial" target="_blank" rel="noopener noreferrer">Twitch · Maticunial</a></li>
                </ul>
              </>
            ) : (
              <>
                <div className="footer-heading">Contacto</div>
                <ul className="footer-links">
                  <li><a href="https://discord.gg/ScF3MV6Ywh" target="_blank" rel="noopener noreferrer">Discord del campeonato</a></li>
                  <li><a href="https://www.instagram.com/copachapachapa/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                </ul>
              </>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">
            © 2026 Copa Chapa Chapa · Todos los derechos reservados
          </span>
        </div>
      </div>
    </footer>
  );
}
