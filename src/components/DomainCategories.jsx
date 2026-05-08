import { TagIcon } from '@heroicons/react/24/outline'

export default function DomainCategories({ categories }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="domains-title">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">Explorer</p>
          <h2 id="domains-title" className="text-2xl font-semibold text-white sm:text-3xl">
            Domaines de commandes
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-zinc-400">
          Une porte d'entrée claire vers les commandes utiles par spécialité.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon

          return (
            <article
              className="group rounded-2xl border border-white/10 bg-zinc-950/80 p-5 transition hover:-translate-y-1 hover:border-orange-500/50 hover:bg-zinc-900/90"
              key={category.id}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange-600/15 text-orange-500 ring-1 ring-orange-500/20">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <TagIcon className="h-5 w-5 text-zinc-600 transition group-hover:text-orange-500" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-white">{category.name}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-zinc-400">{category.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {category.technologies.slice(0, 3).map((technology) => (
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-zinc-300" key={technology}>
                    {technology}
                  </span>
                ))}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
