import { CommandLineIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/75 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a className="flex items-center gap-3 text-white" href="/" aria-label="Accueil GetCommand">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-600 text-white">
            <CommandLineIcon className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold">GetCommand</span>
        </a>
        <div className="hidden items-center gap-6 text-sm text-zinc-400 sm:flex">
          <a className="transition hover:text-white" href="#domains">Domaines</a>
          <a className="transition hover:text-white" href="#popular">Technologies</a>
        </div>
      </nav>
    </header>
  )
}
