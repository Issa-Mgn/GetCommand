import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function SearchBar({ value, onChange, onSubmit, placeholder }) {
  const hasValue = value.trim().length > 0

  return (
    <form
      className="mx-auto flex w-full max-w-3xl items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/90 p-2 shadow-2xl shadow-orange-950/20 backdrop-blur"
      onSubmit={onSubmit}
    >
      <MagnifyingGlassIcon className="ml-3 h-6 w-6 shrink-0 text-orange-500" aria-hidden="true" />
      <input
        className="h-12 min-w-0 flex-1 bg-transparent text-base text-zinc-100 outline-none placeholder:text-zinc-500 sm:text-lg"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Rechercher une technologie ou une commande"
      />
      {hasValue && (
        <button
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-zinc-400 transition hover:bg-white/5 hover:text-zinc-100"
          type="button"
          onClick={() => onChange('')}
          aria-label="Effacer la recherche"
        >
          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
      <button
        className="hidden h-10 rounded-xl bg-orange-600 px-5 text-sm font-semibold text-white transition hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black sm:inline-flex sm:items-center"
        type="submit"
      >
        Rechercher
      </button>
    </form>
  )
}
