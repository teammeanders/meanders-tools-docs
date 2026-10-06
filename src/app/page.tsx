import Link from "next/link";
import { getComponents, getPlugin } from "@/lib/meanders-data";

export default async function Home() {
  const [data, plugin] = await Promise.all([getComponents(), getPlugin()]);

  const previewComponents = data.components.slice(0, 4);

  return (
    <main className="mx-auto w-full max-w-[var(--content-max-width)] px-6 py-14 lg:px-10 lg:py-20">
      {/* Hero */}
      <section className="border-b border-[var(--color-border)] pb-16 lg:pb-20">
        <div className="max-w-4xl">
          <div className="text-label text-[var(--color-accent)]">
            Grasshopper · Rhino
          </div>

          <h1 className="text-page-title mt-5">
            Meanders
            <span className="text-[var(--color-accent)]">.Tools</span>
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-8 text-[var(--color-text-secondary)]">
            {plugin.description.short}
          </p>

          <p className="mt-4 max-w-2xl text-body-small text-[var(--color-text-muted)]">
            {plugin.description.long}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/components/me-attribute"
              className="rounded-md bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--color-accent-foreground)] transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              Explore Documentation
            </Link>

            <Link
              href="/download"
              className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-2.5 text-sm font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-accent-border)] hover:text-[var(--color-accent)]"
            >
              Download
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="border-b border-[var(--color-border)] py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <div className="text-label text-[var(--color-text-muted)]">
              About
            </div>

            <h2 className="text-page-heading mt-3">
              Built for design workflows.
            </h2>
          </div>

          <div className="max-w-3xl text-body text-[var(--color-text-secondary)]">
            <p>{plugin.description.long}</p>

            <p className="mt-5">
              Meanders.Tools provides reusable Grasshopper components for
              geometry, attributes, data, fabrication, and internal design
              workflows.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Release */}
      <section className="border-b border-[var(--color-border)] py-14 lg:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-label text-[var(--color-text-muted)]">
              Latest Release
            </div>

            <h2 className="text-page-heading mt-3">v{plugin.version}</h2>

            <p className="mt-3 text-body-small text-[var(--color-text-secondary)]">
              Rhino {plugin.compatibility.rhino.join(", ")}
              {" · "}
              Grasshopper {plugin.compatibility.grasshopper.join(", ")}
              {" · "}
              {plugin.compatibility.platforms.join(", ")}
            </p>
          </div>

          <Link
            href="/download"
            className="inline-flex w-fit rounded-md border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] px-4 py-2 text-sm font-medium text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)]  hover:text-[var(--color-accent-foreground)]"
          >
            View release
          </Link>
        </div>

        <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-3">
          <div className="bg-[var(--color-surface)] p-5">
            <div className="text-caption">Version</div>

            <div className="mt-1 text-lg font-semibold">{plugin.version}</div>
          </div>

          <div className="bg-[var(--color-surface)] p-5">
            <div className="text-caption">Framework</div>

            <div className="mt-1 text-lg font-semibold">
              {plugin.compatibility.frameworks.join(", ")}
            </div>
          </div>

          <div className="bg-[var(--color-surface)] p-5">
            <div className="text-caption">Platform</div>

            <div className="mt-1 text-lg font-semibold">
              {plugin.compatibility.platforms.join(", ")}
            </div>
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="border-b border-[var(--color-border)] py-14 lg:py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-label text-[var(--color-text-muted)]">
              Documentation
            </div>

            <h2 className="text-page-heading mt-3">Components</h2>

            <p className="mt-2 text-body-small text-[var(--color-text-secondary)]">
              Explore the available Grasshopper tools.
            </p>
          </div>

          <Link
            href="/components/me-attribute"
            className="hidden text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] sm:block"
          >
            View all →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {previewComponents.map((component) => (
            <Link
              key={component.id}
              href={`/components/${component.id}`}
              className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-accent-border)] hover:bg-[var(--color-surface-elevated)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-surface-elevated)]">
                <img
                  src={`https://raw.githubusercontent.com/teammeanders/Meanders.Tools/master/assets/icons/${component.icon}`}
                  alt=""
                  className="h-8 w-8 object-contain"
                />
              </div>

              <div className="mt-5">
                <div className="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)]">
                  {component.name}
                </div>

                <p className="mt-2 text-caption">
                  {component.description.short}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/components/me-attribute"
          className="mt-6 block text-sm font-medium text-[var(--color-accent)] sm:hidden"
        >
          View all components →
        </Link>
      </section>

      {/* Installation */}
      <section className="py-14 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <div className="text-label text-[var(--color-text-muted)]">
              Installation
            </div>

            <h2 className="text-page-heading mt-3">Get started quickly.</h2>
          </div>

          <div>
            <p className="text-body text-[var(--color-text-secondary)]">
              Download the latest release and copy the required files into your
              Grasshopper Components folder.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/download"
                className="rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-[var(--color-accent-foreground)] hover:bg-[var(--color-accent-hover)]"
              >
                Download
              </Link>

              <Link
                href="/installation"
                className="rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-accent-border)] hover:text-[var(--color-accent)]"
              >
                Installation Guide
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
