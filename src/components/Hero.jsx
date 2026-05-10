import { ArrowRightIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import { Badge, Button } from './ui'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__noise" />
      <div className="hero__inner">
        <div className="hero__content">
          <Badge>
            <RocketLaunchIcon className="badge__icon" aria-hidden="true" />
            Command docs for modern stacks
          </Badge>

          <h1 className="hero__title">Commands for developers</h1>

          <p className="hero__lead">
            The command directory built for shipping. Search your stack, pick the workflow,
            and get the exact terminal instruction without leaving your context.
          </p>

          <div className="hero__actions">
            <Button href="#docs">
              Start searching
              <ArrowRightIcon aria-hidden="true" />
            </Button>
            <Button href="#integrate" variant="ghost">
              View commands
            </Button>
          </div>
        </div>

        <aside className="hero-visual" aria-label="GetCommand product visual">
          <div className="hero-visual__glow" />
          <div className="hero-cube">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="hero-orbit hero-orbit--one" />
          <div className="hero-orbit hero-orbit--two" />
        </aside>
      </div>
    </section>
  )
}
