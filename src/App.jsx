import { useMemo, useState } from 'react'
import {
  ArrowRightIcon,
  Bars3BottomLeftIcon,
  BookOpenIcon,
  ChevronRightIcon,
  ClipboardDocumentIcon,
  CommandLineIcon,
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline'
import './App.css'
import { allTechnologies, commandSections, docsCategories } from './data/commandDocs'

function normalize(value) {
  return value.toLowerCase().trim()
}

function technologyMatchesQuery(technology, query) {
  if (!query) {
    return true
  }

  const searchableContent = [
    technology.name,
    technology.description,
    technology.categoryName,
    ...technology.tags,
    ...technology.commands.flatMap((command) => [
      command.section,
      command.title,
      command.command,
      command.explanation,
      ...command.examples,
    ]),
  ]
    .join(' ')
    .toLowerCase()

  return searchableContent.includes(query)
}

function commandMatchesQuery(command, technology, query) {
  if (!query) {
    return true
  }

  return [
    technology.name,
    command.section,
    command.title,
    command.command,
    command.explanation,
    ...command.examples,
  ]
    .join(' ')
    .toLowerCase()
    .includes(query)
}

function App() {
  const [query, setQuery] = useState('')
  const [selectedTechnologyId, setSelectedTechnologyId] = useState(allTechnologies[0]?.id)

  const normalizedQuery = normalize(query)

  const filteredCategories = useMemo(() => {
    return docsCategories
      .map((category) => ({
        ...category,
        technologies: category.technologies.filter((technology) =>
          technologyMatchesQuery(
            { ...technology, categoryId: category.id, categoryName: category.name },
            normalizedQuery,
          ),
        ),
      }))
      .filter((category) => category.technologies.length > 0)
  }, [normalizedQuery])

  const filteredTechnologies = useMemo(() => {
    return filteredCategories.flatMap((category) =>
      category.technologies.map((technology) => ({
        ...technology,
        categoryId: category.id,
        categoryName: category.name,
      })),
    )
  }, [filteredCategories])

  const selectedTechnology = useMemo(() => {
    return (
      filteredTechnologies.find((technology) => technology.id === selectedTechnologyId) ??
      filteredTechnologies[0] ??
      null
    )
  }, [filteredTechnologies, selectedTechnologyId])

  const groupedCommands = useMemo(() => {
    if (!selectedTechnology) {
      return []
    }

    return commandSections
      .map((section) => ({
        section,
        commands: selectedTechnology.commands.filter(
          (command) =>
            command.section === section &&
            commandMatchesQuery(command, selectedTechnology, normalizedQuery),
        ),
      }))
      .filter((group) => group.commands.length > 0)
  }, [normalizedQuery, selectedTechnology])

  const handleTechnologySelect = (technologyId) => {
    setSelectedTechnologyId(technologyId)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:h-16 sm:px-6 lg:px-8">
          <a className="flex items-center gap-3" href="#top" aria-label="GetCommand home">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-orange-700 text-white shadow-lg shadow-orange-950/40 sm:h-10 sm:w-10">
              <CommandLineIcon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </span>
            <span className="text-lg font-semibold text-white">GetCommand</span>
          </a>
          <div className="flex items-center gap-3 text-sm">
            <a className="hidden text-zinc-400 transition hover:text-white sm:inline" href="#docs">
              Documentation
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-xl bg-orange-700 px-3 py-2 font-semibold text-white transition hover:bg-orange-600"
              href="#docs"
            >
              Docs
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </nav>
      </header>

      <main id="top" className="overflow-hidden">
        <section className="soft-grid border-b border-white/10 px-3 py-6 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-xl border border-orange-700/30 bg-orange-950/20 px-3 py-1 text-xs font-medium text-orange-300 sm:text-sm">
                <RocketLaunchIcon className="h-4 w-4" aria-hidden="true" />
                Documentation de commandes pour développeurs
              </p>
              <h1 className="mt-4 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:mt-6 sm:text-6xl">
                Retrouve vite la commande exacte pour ta stack.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:mt-5 sm:text-lg sm:leading-7">
                GetCommand classe les commandes par technologies, puis par usage : installation,
                dev, build, debug, workflow Git et déploiement.
              </p>

              <label className="mt-5 block max-w-2xl sm:mt-8">
                <span className="sr-only">Rechercher une technologie ou une commande</span>
                <span className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-zinc-400 shadow-2xl shadow-black/30 focus-within:border-orange-600/70">
                  <MagnifyingGlassIcon className="h-5 w-5 shrink-0 text-orange-600" aria-hidden="true" />
                  <input
                    className="min-w-0 flex-1 bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-600 sm:text-base"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Rechercher React, Docker, psql, deploy..."
                    type="search"
                  />
                </span>
              </label>

              <div className="mt-5 grid gap-3 min-[420px]:flex min-[420px]:flex-wrap sm:mt-6">
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                  href="#docs"
                >
                  Ouvrir la documentation
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-orange-700/50 hover:text-white"
                  href="#docs"
                >
                  Voir les stacks
                  <BookOpenIcon className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="hidden min-w-0 rounded-xl border border-white/10 bg-zinc-950/80 p-3 shadow-2xl shadow-black/30 sm:p-4 lg:block">
              <div className="mb-3 flex items-center gap-2 text-sm text-zinc-500">
                <CommandLineIcon className="h-5 w-5 text-orange-600" aria-hidden="true" />
                Exemple rapide
              </div>
              <div className="space-y-3">
                {['npm create vite@latest my-app -- --template react', 'docker build -t getcommand:latest .', 'kubectl logs -f deployment/api'].map((command) => (
                  <pre className="max-w-full overflow-x-auto rounded-xl border border-orange-700/20 bg-black px-3 py-3 text-xs text-orange-200 sm:px-4 sm:text-sm" key={command}>
                    <code>{command}</code>
                  </pre>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1520px] px-3 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-10" id="docs">
          <div className="sticky top-14 z-20 -mx-3 border-b border-white/10 bg-[#0A0A0A]/95 px-3 py-3 backdrop-blur-xl lg:hidden">
            <label className="block">
              <span className="sr-only">Rechercher</span>
              <span className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-950 px-3 py-3 text-zinc-400 focus-within:border-orange-600/70">
                <MagnifyingGlassIcon className="h-5 w-5 shrink-0 text-orange-600" aria-hidden="true" />
                <input
                  className="min-w-0 flex-1 bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Chercher une commande..."
                  type="search"
                />
              </span>
            </label>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {filteredTechnologies.map((technology) => {
                const isActive = selectedTechnology?.id === technology.id

                return (
                  <button
                    className={`shrink-0 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'border-orange-600 bg-orange-700 text-white'
                        : 'border-white/10 bg-zinc-950 text-zinc-400'
                    }`}
                    key={technology.id}
                    type="button"
                    onClick={() => handleTechnologySelect(technology.id)}
                  >
                    {technology.name}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid min-w-0 gap-4 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-6">
            <aside className="hidden self-start rounded-xl border border-white/10 bg-black/70 p-3 sm:p-4 lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-700 text-white">
                  <BookOpenIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-white">Documentation</p>
                  <p className="text-xs text-zinc-500">Catégories et technologies</p>
                </div>
              </div>

              <label className="mt-5 block">
                <span className="sr-only">Rechercher</span>
                <span className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-950 px-3 py-2.5 text-zinc-400 focus-within:border-orange-600/70">
                  <MagnifyingGlassIcon className="h-5 w-5 text-orange-600" aria-hidden="true" />
                  <input
                    className="min-w-0 flex-1 bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Filtrer..."
                    type="search"
                  />
                </span>
              </label>

              <label className="mt-4 block lg:hidden">
                <span className="sr-only">Choisir une technologie</span>
                <select
                  className="w-full rounded-xl border border-white/10 bg-zinc-950 px-3 py-3 text-sm font-medium text-zinc-100 outline-none focus:border-orange-600/70"
                  value={selectedTechnology?.id ?? ''}
                  onChange={(event) => handleTechnologySelect(event.target.value)}
                >
                  {filteredCategories.map((category) => (
                    <optgroup label={category.name} key={category.id}>
                      {category.technologies.map((technology) => (
                        <option value={technology.id} key={technology.id}>
                          {technology.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </label>

              <nav className="mt-5 hidden gap-3 overflow-x-auto pb-2 lg:block lg:space-y-6 lg:overflow-visible lg:pb-0">
                {filteredCategories.map((category) => (
                  <section className="min-w-64 lg:min-w-0" key={category.id}>
                    <div className="mb-2 flex items-center gap-2 px-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      <Squares2X2Icon className="h-4 w-4" aria-hidden="true" />
                      {category.name}
                    </div>
                    <div className="space-y-1">
                      {category.technologies.map((technology) => {
                        const isActive = selectedTechnology?.id === technology.id

                        return (
                          <button
                            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                              isActive
                                ? 'bg-orange-700 text-white shadow-lg shadow-orange-950/30'
                                : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                            }`}
                            key={technology.id}
                            type="button"
                            onClick={() => handleTechnologySelect(technology.id)}
                          >
                            <span>{technology.name}</span>
                            <ChevronRightIcon
                              className={`h-4 w-4 ${isActive ? 'text-white' : 'text-zinc-700'}`}
                              aria-hidden="true"
                            />
                          </button>
                        )
                      })}
                    </div>
                  </section>
                ))}
              </nav>
            </aside>

            <div className="min-w-0 pt-4 lg:pt-0">
              {selectedTechnology ? (
                <div className="min-w-0 rounded-xl border-0 border-white/10 bg-transparent p-0 sm:border sm:bg-black/40 sm:p-6 lg:p-8">
                  <header className="border-b border-white/10 pb-4 sm:pb-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 sm:text-sm">
                      <BookOpenIcon className="h-5 w-5 text-orange-600" aria-hidden="true" />
                      <span>{selectedTechnology.categoryName}</span>
                      <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
                      <span className="text-zinc-300">{selectedTechnology.name}</span>
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:mt-4 sm:text-4xl">
                      {selectedTechnology.name}
                    </h2>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400 sm:mt-4 sm:text-base">
                      {selectedTechnology.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                      {selectedTechnology.tags.map((tag) => (
                        <span className="rounded-xl border border-orange-600/30 bg-orange-950/30 px-3 py-1 text-xs font-medium text-orange-300" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </header>

                  <div className="mt-5 space-y-7 sm:mt-8 sm:space-y-10">
                    {groupedCommands.length > 0 ? (
                      groupedCommands.map((group) => (
                        <section key={group.section}>
                          <div className="mb-4 flex items-center gap-3">
                            <span className="grid h-9 w-9 place-items-center rounded-xl bg-orange-700/15 text-orange-500 ring-1 ring-orange-700/30">
                              <Bars3BottomLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                            <h3 className="text-lg font-semibold text-white sm:text-xl">{group.section}</h3>
                          </div>

                          <div className="grid gap-4">
                            {group.commands.map((command) => (
                              <article className="min-w-0 rounded-xl border border-white/10 bg-zinc-950/80 p-3 shadow-lg shadow-black/20 sm:p-5" key={`${group.section}-${command.title}`}>
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                  <div className="min-w-0">
                                    <h4 className="text-base font-semibold text-white sm:text-lg">{command.title}</h4>
                                    <p className="mt-2 text-sm leading-5 text-zinc-400 sm:leading-6">{command.explanation}</p>
                                  </div>
                                  <ClipboardDocumentIcon className="hidden h-5 w-5 shrink-0 text-zinc-600 sm:block" aria-hidden="true" />
                                </div>

                                <pre className="mt-4 max-w-full overflow-x-auto rounded-xl border border-orange-700/20 bg-black px-3 py-3 text-xs text-orange-200 sm:px-4 sm:text-sm">
                                  <code>{command.command}</code>
                                </pre>

                                <div className="mt-4 flex flex-wrap gap-2">
                                  {command.examples.map((example) => (
                                    <code className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-zinc-300" key={example}>
                                      {example}
                                    </code>
                                  ))}
                                </div>
                              </article>
                            ))}
                          </div>
                        </section>
                      ))
                    ) : (
                      <div className="rounded-xl border border-white/10 bg-zinc-950 p-6 text-sm text-zinc-400">
                        Aucune commande ne correspond à cette recherche pour {selectedTechnology.name}.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-white/10 bg-zinc-950 p-8 text-center">
                  <MagnifyingGlassIcon className="mx-auto h-8 w-8 text-orange-600" aria-hidden="true" />
                  <h2 className="mt-4 text-2xl font-semibold text-white">Aucun résultat</h2>
                  <p className="mt-2 text-sm text-zinc-400">
                    Essaie une autre recherche, par exemple React, Docker, psql ou deploy.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
