import logoUrl from '../assets/getcommand-logo.svg'
import { Button } from './ui'

export default function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="site-header__inner" aria-label="Navigation principale">
        <a className="brand-mark" href="#top" aria-label="GetCommand home">
          <span className="brand-mark__icon">
            <img src={logoUrl} alt="" aria-hidden="true" />
          </span>
          <span className="brand-mark__text">GetCommand</span>
        </a>

        <div className="site-header__links">
          <a href="#features">Features</a>
          <a href="#docs">Docs</a>
          <a href="#commands">Commands</a>
        </div>

        <div className="site-header__actions">
          <a className="site-header__signin" href="#docs">
            Sign in
          </a>
          <Button href="#docs">Get started</Button>
        </div>
      </nav>
    </header>
  )
}
