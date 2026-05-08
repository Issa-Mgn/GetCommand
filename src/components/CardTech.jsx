import { ArrowRightIcon, CommandLineIcon } from '@heroicons/react/24/outline'

export default function CardTech({ technology, isSelected, onSelect }) {
  return (
    <article
      className={`rounded-2xl border p-5 transition hover:border-orange-500/50 hover:bg-zinc-950 ${
        isSelected ? 'border-orange-500/70 bg-zinc-950' : 'border-white/10 bg-black/40'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-orange-500">{technology.domain}</p>
          <h3 className="mt-1 text-xl font-semibold text-white">{technology.name}</h3>
        </div>
        <CommandLineIcon className="h-6 w-6 shrink-0 text-zinc-500" aria-hidden="true" />
      </div>
      <p className="mt-4 text-sm text-zinc-400">{technology.commandCount} commandes référencées</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {technology.tags.map((tag) => (
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-300" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <button
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-500 transition hover:text-orange-400"
        type="button"
        onClick={onSelect}
      >
        Voir les commandes
        <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
      </button>
    </article>
  )
}
