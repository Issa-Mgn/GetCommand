import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export function Button({ children, href, variant = 'primary', className = '' }) {
  const Component = href ? 'a' : 'button'
  const buttonClass = `button button--${variant} ${className}`.trim()

  return (
    <Component className={buttonClass} href={href} type={href ? undefined : 'button'}>
      {children}
    </Component>
  )
}

export function Badge({ children, tone = 'neutral' }) {
  return <span className={`badge badge--${tone}`}>{children}</span>
}

export function SearchField({ value, onChange, placeholder, compact = false }) {
  return (
    <label className={`search-field ${compact ? 'search-field--compact' : ''}`}>
      <span className="sr-only">Rechercher une technologie ou une commande</span>
      <MagnifyingGlassIcon className="search-field__icon" aria-hidden="true" />
      <input
        className="search-field__input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type="search"
      />
    </label>
  )
}

export function CodeWindow({ children, label = 'terminal', className = '' }) {
  return (
    <div className={`code-window ${className}`.trim()}>
      <div className="code-window__chrome">
        <span className="traffic-dot traffic-dot--red" />
        <span className="traffic-dot traffic-dot--yellow" />
        <span className="traffic-dot traffic-dot--green" />
        <span className="code-window__label">{label}</span>
      </div>
      <div className="code-window__body">{children}</div>
    </div>
  )
}

export function CommandLine({ children }) {
  return (
    <pre className="command-line">
      <code>{children}</code>
    </pre>
  )
}
