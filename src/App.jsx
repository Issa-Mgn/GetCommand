import { useMemo, useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import MarketingPage from './components/MarketingPage'
import SiteFooter from './components/SiteFooter'
import SiteHeader from './components/SiteHeader'
import { allTechnologies, commandSections, docsCategories } from './data/commandDocs'
import { commandMatchesQuery, normalizeQuery, technologyMatchesQuery } from './lib/search'

function App() {
  const [query, setQuery] = useState('')
  const [selectedTechnologyId, setSelectedTechnologyId] = useState(allTechnologies[0]?.id)

  const normalizedQuery = normalizeQuery(query)

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

  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="top">
        <Hero query={query} onQueryChange={setQuery} />
        <MarketingPage
          technologies={filteredTechnologies}
          selectedTechnology={selectedTechnology}
          groupedCommands={groupedCommands}
          query={query}
          onQueryChange={setQuery}
          onTechnologySelect={setSelectedTechnologyId}
        />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
