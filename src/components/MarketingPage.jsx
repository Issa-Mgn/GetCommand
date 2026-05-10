import {
  ArrowPathIcon,
  BoltIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
  CloudArrowUpIcon,
  CodeBracketIcon,
  CommandLineIcon,
  CpuChipIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  SparklesIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline'
import { Badge, Button, CodeWindow, CommandLine, SearchField } from './ui'

const logos = ['Vercel', 'Linear', 'Raycast', 'Mintlify', 'Supabase', 'Railway', 'GitHub', 'Docker']

const featureCards = [
  {
    icon: BoltIcon,
    title: 'Instant workflows',
    copy: 'Every command is grouped by intent, so install, build, debug and deploy stay one click apart.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Production-minded',
    copy: 'Examples include the small verification steps developers actually run before pushing.',
  },
]

const deliverability = [
  ['Validated commands', 'Commands are attached to real use cases, not dumped as a generic cheat sheet.'],
  ['Stack context', 'React, Docker, Postgres and more keep their own workflow rhythm.'],
  ['No tab hunting', 'The explanation, command and follow-up examples stay in the same frame.'],
  ['Fast filtering', 'Search across technologies, tags, explanations and command examples.'],
  ['Deployment ready', 'Build and deploy sections surface the last mile commands.'],
  ['Debug first', 'Debug recipes sit beside install and run steps, where they belong.'],
]

const testimonials = [
  'GetCommand feels like the missing terminal memory layer.',
  'The workflow grouping makes it faster than opening old project READMEs.',
  'Exactly the kind of dark, focused docs page I want beside my editor.',
]

export default function MarketingPage({
  technologies,
  selectedTechnology,
  groupedCommands,
  query,
  onQueryChange,
  onTechnologySelect,
}) {
  const previewCommands = groupedCommands.flatMap((group) => group.commands).slice(0, 4)
  const selectedCommand = previewCommands[0]

  return (
    <>
      <SocialProof />

      <section className="product-section product-section--center atmospheric atmospheric--blue" id="integrate">
        <SectionIcon>
          <CommandLineIcon aria-hidden="true" />
        </SectionIcon>
        <p className="section-kicker">Integrate this weekend</p>
        <h2 className="section-title">Search once. Ship faster.</h2>
        <p className="section-copy section-copy--center">
          Type a framework, database, CLI flag or deploy target. GetCommand filters the whole
          library and keeps the command in a clean terminal frame.
        </p>

        <div className="command-browser" id="docs">
          <SearchField
            value={query}
            onChange={onQueryChange}
            placeholder="Search React, Docker, psql, deploy..."
          />

          <div className="tech-strip">
            {technologies.map((technology) => (
              <button
                className={`tech-chip ${
                  selectedTechnology?.id === technology.id ? 'tech-chip--active' : ''
                }`}
                key={technology.id}
                type="button"
                onClick={() => onTechnologySelect(technology.id)}
              >
                {technology.name}
              </button>
            ))}
          </div>

          <CodeWindow label={selectedTechnology?.name ?? 'command'}>
            {previewCommands.length > 0 ? (
              previewCommands.map((command) => (
                <CommandLine key={command.title}>{command.command}</CommandLine>
              ))
            ) : (
              <CommandLine>No command matches this search.</CommandLine>
            )}
          </CodeWindow>
        </div>
      </section>

      <section className="product-section product-section--split" id="features">
        <div className="section-heading">
          <h2 className="section-title section-title--small">First-class developer experience</h2>
          <p className="section-copy">
            The page behaves like a product surface, not a list. It teaches enough context,
            then gives you the command with examples right where your eye expects them.
          </p>
        </div>

        <div className="feature-grid feature-grid--two">
          {featureCards.map((card) => (
            <article className="feature-card" key={card.title}>
              <card.icon aria-hidden="true" />
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="product-section product-section--center atmospheric atmospheric--purple">
        <SectionIcon>
          <SparklesIcon aria-hidden="true" />
        </SectionIcon>
        <h2 className="section-title section-title--small">Write using a delightful editor</h2>
        <p className="section-copy section-copy--center">
          Every command card is framed like a small terminal inside a polished editor mockup.
        </p>

        <div className="editor-mockup">
          <div className="editor-mockup__top">
            <span>GetCommand Studio</span>
            <Button href="#docs">Run</Button>
          </div>
          <div className="editor-mockup__stage">
            <div className="editor-card editor-card--dark">
              <Badge>Selected stack</Badge>
              <h3>{selectedTechnology?.name ?? 'React'}</h3>
              <p>{selectedTechnology?.description ?? 'Choose a stack to preview commands.'}</p>
            </div>
            <div className="editor-card editor-card--light">
              <h3>{selectedCommand?.title ?? 'Create a project'}</h3>
              <p>{selectedCommand?.explanation ?? 'Search a stack to reveal command context.'}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="product-section">
        <div className="section-heading">
          <h2 className="section-title section-title--small">Go beyond copying</h2>
          <p className="section-copy">
            GetCommand keeps explanations, examples and workflow sections close enough to be
            useful without turning the page into a dashboard.
          </p>
        </div>

        <div className="feature-grid feature-grid--two">
          <MetricCard value={technologies.length} label="documented stacks" icon={Squares2X2Icon} />
          <MetricCard value={previewCommands.length || 0} label="commands in view" icon={ChartBarIcon} />
        </div>
      </section>

      <section className="product-section product-section--center atmospheric atmospheric--green" id="commands">
        <SectionIcon>
          <CodeBracketIcon aria-hidden="true" />
        </SectionIcon>
        <h2 className="section-title section-title--small">Develop with your stack</h2>
        <p className="section-copy section-copy--center">
          The current selection renders like an IDE: navigation, code, and a readable output card
          in one composed frame.
        </p>

        <div className="ide-mockup">
          <aside className="ide-mockup__rail">
            {technologies.slice(0, 7).map((technology) => (
              <button
                className={selectedTechnology?.id === technology.id ? 'is-active' : ''}
                key={technology.id}
                type="button"
                onClick={() => onTechnologySelect(technology.id)}
              >
                {technology.name}
              </button>
            ))}
          </aside>
          <CodeWindow label="workflow.js">
            {(previewCommands.length > 0 ? previewCommands : [{ title: 'Empty', command: 'search --again' }]).map(
              (command) => (
                <CommandLine key={command.title}>{command.command}</CommandLine>
              ),
            )}
          </CodeWindow>
          <div className="ide-output">
            <Badge tone="light">Preview</Badge>
            <h3>{selectedTechnology?.name ?? 'Stack'} workflow</h3>
            <p>{selectedCommand?.explanation ?? 'The selected command appears with explanation and examples.'}</p>
            <Button href="#docs">Copy command</Button>
          </div>
        </div>
      </section>

      <section className="product-section">
        <div className="section-heading">
          <h2 className="section-title section-title--small">Reach workflows, not scattered docs</h2>
        </div>
        <div className="deliverability-grid">
          {deliverability.map(([title, copy], index) => {
            const icons = [CheckCircleIcon, MagnifyingGlassIcon, ClipboardDocumentIcon, ArrowPathIcon, CloudArrowUpIcon, CpuChipIcon]
            const Icon = icons[index]
            return (
              <article className="mini-feature" key={title}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="quote-section">
        <p>
          Resend-inspired structure for a command product: black canvas, editorial hierarchy,
          quiet cards, and terminal surfaces that feel intentional.
        </p>
        <span>GetCommand design direction</span>
      </section>

      <section className="product-section product-section--center atmospheric atmospheric--green">
        <SectionIcon>
          <CubeTransparentIcon aria-hidden="true" />
        </SectionIcon>
        <h2 className="section-title section-title--small">Everything in your control</h2>
        <p className="section-copy section-copy--center">
          Search state, selected stack, grouped commands and examples stay visible in a single
          composed product surface.
        </p>

        <div className="dashboard-mockup">
          <div className="dashboard-mockup__sidebar">
            {['Overview', 'Commands', 'Stacks', 'Deploy', 'Debug'].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="dashboard-mockup__main">
            <div className="dashboard-mockup__cards">
              <MetricCard value={selectedTechnology?.name ?? 'React'} label="active stack" />
              <MetricCard value={groupedCommands.length} label="workflow groups" />
              <MetricCard value={previewCommands.length} label="visible commands" />
            </div>
            <div className="dashboard-chart">
              <span />
            </div>
          </div>
        </div>
      </section>

      <section className="expectations-section">
        <h2 className="section-title section-title--small">Beyond expectations</h2>
        <div className="testimonial-row">
          {testimonials.map((quote, index) => (
            <article className="testimonial-card" key={quote}>
              <p>{quote}</p>
              <span>
                <i>{index + 1}</i>
                Developer workflow
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="closing-cta">
        <h2>Email reimagined. Available today.</h2>
        <p>For GetCommand, that becomes command discovery reimagined on the same visual rhythm.</p>
        <Button href="#docs">Explore commands</Button>
      </section>
    </>
  )
}

function SectionIcon({ children }) {
  return <div className="section-icon">{children}</div>
}

function SocialProof() {
  return (
    <section className="social-proof" aria-label="Trusted by developer tools">
      <div className="social-proof__line" />
      <p>Used like a command memory layer by builders across modern stacks</p>
      <div className="logo-cloud">
        {logos.map((logo) => (
          <span key={logo}>{logo}</span>
        ))}
      </div>
    </section>
  )
}

function MetricCard({ value, label, icon: Icon }) {
  return (
    <article className="metric-card">
      {Icon ? <Icon aria-hidden="true" /> : null}
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  )
}
