export function normalizeQuery(value) {
  return value.toLowerCase().trim()
}

export function technologyMatchesQuery(technology, query) {
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

export function commandMatchesQuery(command, technology, query) {
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
