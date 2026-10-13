import Link from "next/link";
import { notFound } from "next/navigation";

import { getComponents } from "@/lib/meanders-data";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ParameterPage({ params }: Props) {
  const { id } = await params;

  const data = await getComponents();

  const parameter = data.parameters.find((item) => item.id === id);

  if (!parameter) {
    notFound();
  }

  const relatedParameters = parameter.related
    .map((relatedId) => data.parameters.find((item) => item.id === relatedId))
    .filter(Boolean);

  const relatedComponents = parameter.related
    .map((relatedId) => data.components.find((item) => item.id === relatedId))
    .filter(Boolean);

  return (
    <main className="mx-auto w-full max-w-[var(--content-max-width)] px-6 py-12 lg:px-10 lg:py-16">
      {/* Header */}
      <header className="max-w-4xl">
        <div className="text-label text-[var(--color-accent)]">
          {parameter.category} · {parameter.subcategory}
        </div>

        <div className="mt-4 flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <img
              src={`https://raw.githubusercontent.com/teammeanders/Meanders.Tools/master/assets/icons/${parameter.icon}`}
              alt=""
              className="h-9 w-9 object-contain"
            />
          </div>

          <div className="min-w-0">
            <h1 className="text-page-title">{parameter.name}</h1>

            <div className="mt-1 text-sm text-[var(--color-text-muted)]">
              {parameter.nickname}
              {" · "}
              {parameter.type}
              {" · "}
              {parameter.access}
            </div>
          </div>
        </div>

        <p className="mt-5 max-w-3xl text-body text-[var(--color-text-secondary)]">
          {parameter.description.short}
        </p>
      </header>

      {/* Overview */}
      <section className="mt-14 border-t border-[var(--color-border)] pt-12">
        <div className="text-label text-[var(--color-text-muted)]">
          Overview
        </div>

        <h2 className="text-page-heading mt-2">Description</h2>

        <p className="mt-4 max-w-3xl text-body text-[var(--color-text-secondary)]">
          {parameter.description.long}
        </p>
      </section>

      {/* Parameter details */}
      <section className="mt-14 border-t border-[var(--color-border)] pt-12">
        <div className="text-label text-[var(--color-text-muted)]">
          Parameter
        </div>

        <h2 className="text-page-heading mt-2">Details</h2>

        <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-3">
          <div className="bg-[var(--color-surface)] p-5">
            <div className="text-caption">Type</div>

            <code className="mt-1 block text-sm text-[var(--color-accent-light)]">
              {parameter.type}
            </code>
          </div>

          <div className="bg-[var(--color-surface)] p-5">
            <div className="text-caption">Access</div>

            <div className="mt-1 text-sm font-semibold">{parameter.access}</div>
          </div>

          <div className="bg-[var(--color-surface)] p-5">
            <div className="text-caption">Status</div>

            <div className="mt-1 text-sm font-semibold">{parameter.status}</div>
          </div>
        </div>
      </section>

      {/* Notes */}
      {parameter.notes.length > 0 && (
        <section className="mt-14 border-t border-[var(--color-border)] pt-12">
          <div className="text-label text-[var(--color-text-muted)]">
            Additional Information
          </div>

          <h2 className="text-page-heading mt-2">Notes</h2>

          <ul className="mt-6 space-y-3">
            {parameter.notes.map((note) => (
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

      {/* Related */}
      {(relatedParameters.length > 0 || relatedComponents.length > 0) && (
        <section className="mt-14 border-t border-[var(--color-border)] pt-12">
          <div className="text-label text-[var(--color-text-muted)]">
            Explore More
          </div>

          <h2 className="text-page-heading mt-2">Related</h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedComponents.map((related) =>
              related ? (
                <Link
                  key={related.id}
                  href={`/components/${related.id}`}
                  className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-accent-border)] hover:bg-[var(--color-surface-elevated)]"
                >
                  <div className="text-xs text-[var(--color-text-muted)]">
                    Component
                  </div>

                  <h3 className="mt-2 text-sm font-semibold group-hover:text-[var(--color-accent)]">
                    {related.name}
                  </h3>

                  <p className="mt-2 text-caption">
                    {related.description.short}
                  </p>
                </Link>
              ) : null,
            )}

            {relatedParameters.map((related) =>
              related ? (
                <Link
                  key={related.id}
                  href={`/parameters/${related.id}`}
                  className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-accent-border)] hover:bg-[var(--color-surface-elevated)]"
                >
                  <div className="text-xs text-[var(--color-text-muted)]">
                    Parameter
                  </div>

                  <h3 className="mt-2 text-sm font-semibold group-hover:text-[var(--color-accent)]">
                    {related.name}
                  </h3>

                  <p className="mt-2 text-caption">
                    {related.description.short}
                  </p>
                </Link>
              ) : null,
            )}
          </div>
        </section>
      )}
    </main>
  );
}
