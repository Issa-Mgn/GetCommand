export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <p className="site-footer__brand">GetCommand</p>
          <p className="site-footer__copy">Répertoire moderne de commandes informatiques.</p>
        </div>

        <div className="site-footer__links" aria-label="Liens rapides">
          <a href="#features">Features</a>
          <a href="#docs">Docs</a>
          <a href="#commands">Commands</a>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>© 2026 GetCommand</span>
        <span className="site-footer__status">
          <span className="status-dot" />
          Status: Operational
        </span>
      </div>
    </footer>
  )
}
