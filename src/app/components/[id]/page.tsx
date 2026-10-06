import { notFound } from "next/navigation";
import { getComponents } from "@/lib/meanders-data";
import { GrasshopperComponent } from "@/components/GrasshopperComponent";
import { PortList } from "@/components/PortList";
import Link from "next/link";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ComponentPage({ params }: Props) {
  const { id } = await params;

  const data = await getComponents();

  const component = data.components.find((item) => item.id === id);

  if (!component) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-[var(--content-max-width)] px-6 py-12 lg:px-10 lg:py-16">
      <header className="max-w-4xl">
        <div className="text-label text-[var(--color-accent)]">
          {component.category} · {component.subcategory}
        </div>

        <div className="mt-4 flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <img
              src={`https://raw.githubusercontent.com/teammeanders/Meanders.Tools/master/assets/icons/${component.icon}`}
              alt=""
              className="h-9 w-9 object-contain"
            />
          </div>

          <div className="min-w-0">
            <h1 className="text-page-title">{component.name}</h1>

            <div className="mt-1 text-sm text-[var(--color-text-muted)]">
              {component.nickname}
              {" · "}v{component.introducedIn}
            </div>
          </div>
        </div>

        <p className="mt-5 max-w-3xl text-body text-[var(--color-text-secondary)]">
          {component.description.short}
        </p>
      </header>

      <section className="mt-10">
        <GrasshopperComponent component={component} />
      </section>

      <section className="mt-14 border-t border-[var(--color-border)] pt-12">
        <div className="text-label text-[var(--color-text-muted)]">
          Overview
        </div>

        <h2 className="text-page-heading mt-3">Description</h2>

        <p className="mt-4 max-w-3xl text-body text-[var(--color-text-secondary)]">
          {component.description.long}
        </p>
      </section>

      <div className="mt-14 grid gap-16 lg:grid-cols-2">
        <PortList title="Inputs" ports={component.inputs} />

        <PortList title="Outputs" ports={component.outputs} />
      </div>

      {/* Settings */}
      {component.settings.length > 0 && (
        <section className="mt-14 border-t border-[var(--color-border)] pt-12">
          <div className="text-label text-[var(--color-text-muted)]">
            Configuration
          </div>

          <h2 className="text-page-heading mt-2">Settings</h2>

          <div className="mt-6 overflow-hidden rounded-xl border border-[var(--color-border)]">
            {component.settings.map((setting, index) => {
              const item = setting as {
                name?: string;
                type?: string;
                persistent?: boolean;
                options?: string[];
              };

              return (
                <div
                  key={item.name ?? index}
                  className="border-b border-[var(--color-border)] bg-[var(--color-surface)] p-5 last:border-b-0"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>

                      <div className="mt-1 text-caption">
                        {item.type}
                        {item.persistent ? " · persistent" : ""}
                      </div>
                    </div>

                    {item.options && item.options.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.options.map((option) => (
                          <span
                            key={option}
                            className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-2 py-1 text-xs text-[var(--color-text-secondary)]"
                          >
                            {option}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {component.examples.length > 0 && (
        <section className="mt-14 border-t border-[var(--color-border)] pt-12">
          <div className="text-label text-[var(--color-text-muted)]">Usage</div>

          <h2 className="text-page-heading mt-2">Examples</h2>

          <div className="mt-6 space-y-4">
            {component.examples.map((example, index) => {
              const item = example as {
                title?: string;
                description?: string;
                input?: unknown;
                output?: unknown;
              };

              return (
                <div
                  key={item.title ?? index}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
                >
                  <h3 className="font-semibold">
                    {item.title ?? `Example ${index + 1}`}
                  </h3>

                  {item.description && (
                    <p className="mt-2 text-body-small text-[var(--color-text-secondary)]">
                      {item.description}
                    </p>
                  )}

                  {(item.input !== undefined || item.output !== undefined) && (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {item.input !== undefined && (
                        <div className="rounded-md bg-[var(--color-surface-elevated)] p-3">
                          <div className="text-caption">Input</div>

                          <code className="mt-1 block text-sm text-[var(--color-accent-light)]">
                            {String(item.input)}
                          </code>
                        </div>
                      )}

                      {item.output !== undefined && (
                        <div className="rounded-md bg-[var(--color-surface-elevated)] p-3">
                          <div className="text-caption">Output</div>

                          <code className="mt-1 block text-sm text-[var(--color-accent-light)]">
                            {String(item.output)}
                          </code>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {component.notes.length > 0 && (
        <section className="mt-14 border-t border-[var(--color-border)] pt-12">
          <div className="text-label text-[var(--color-text-muted)]">
            Additional Information
          </div>

          <h2 className="text-page-heading mt-2">Notes</h2>

          <ul className="mt-6 space-y-3">
            {component.notes.map((note) => (
              <li
                key={note}
                className="flex gap-3 text-body-small text-[var(--color-text-secondary)]"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />

                <span>{note}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {component.errors.length > 0 && (
        <section className="mt-14 border-t border-[var(--color-border)] pt-12">
          <div className="text-label text-[var(--color-text-muted)]">
            Validation
          </div>

          <h2 className="text-page-heading mt-2">Errors</h2>

          <div className="mt-6 rounded-xl border border-red-900/40 bg-red-950/20 p-5">
            <ul className="space-y-3">
              {component.errors.map((error) => (
                <li key={error} className="flex gap-3 text-sm text-red-200">
                  <span className="text-red-400">!</span>

                  <span>{error}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {component.related.length > 0 && (
        <section className="mt-14 border-t border-[var(--color-border)] pt-12">
          <div className="text-label text-[var(--color-text-muted)]">
            Explore More
          </div>

          <h2 className="text-page-heading mt-2">Related Components</h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {component.related.map((relatedId) => {
              const related = data.components.find(
                (item) => item.id === relatedId,
              );

              if (!related) {
                return null;
              }

              return (
                <Link
                  key={related.id}
                  href={`/components/${related.id}`}
                  className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-accent-border)] hover:bg-[var(--color-surface-elevated)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-surface-elevated)]">
                    <img
                      src={`https://raw.githubusercontent.com/teammeanders/Meanders.Tools/master/assets/icons/${related.icon}`}
                      alt=""
                      className="h-7 w-7 object-contain"
                    />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)]">
                    {related.name}
                  </h3>

                  <p className="mt-2 text-caption">
                    {related.description.short}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </article>
  );
}
