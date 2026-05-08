import { BookOpenIcon, CommandLineIcon } from '@heroicons/react/24/outline'
import CommandItem from './CommandItem'

export default function TechDetails({ technology }) {
  if (!technology) {
    return (
      <aside className="rounded-2xl border border-white/10 bg-zinc-950/70 p-6">
        <BookOpenIcon className="h-8 w-8 text-orange-500" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-semibold text-white">Choisis une technologie</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Clique sur une carte pour voir les commandes utiles, leur rôle, leur explication et des exemples.
        </p>
      </aside>
    )
  }

  return (
    <aside className="rounded-2xl border border-orange-500/30 bg-zinc-950/80 p-5 shadow-2xl shadow-orange-950/20">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">{technology.domain}</p>
          <h3 className="mt-1 text-2xl font-semibold text-white">{technology.name}</h3>
          <p className="mt-2 text-sm text-zinc-400">
            {technology.level} · {technology.commands.length} commandes prêtes à l’emploi
          </p>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orange-600 text-white">
          <CommandLineIcon className="h-6 w-6" aria-hidden="true" />
        </span>
      </div>

      <div className="space-y-4">
        {technology.commands.map((command) => (
          <CommandItem command={command} key={`${technology.id}-${command.name}`} />
        ))}
      </div>
    </aside>
  )
}
