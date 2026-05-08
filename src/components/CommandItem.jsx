import { ClipboardDocumentIcon, CommandLineIcon } from '@heroicons/react/24/outline'

export default function CommandItem({ command }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500">
            <CommandLineIcon className="h-4 w-4" aria-hidden="true" />
            {command.role}
          </p>
          <h4 className="mt-2 text-lg font-semibold text-white">{command.name}</h4>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{command.explanation}</p>
        </div>
        <ClipboardDocumentIcon className="hidden h-5 w-5 shrink-0 text-zinc-600 sm:block" aria-hidden="true" />
      </div>

      <pre className="mt-4 overflow-x-auto rounded-xl border border-orange-500/20 bg-black p-4 text-sm text-orange-200">
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
  )
}
