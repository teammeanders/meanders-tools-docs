import { getRoadmapWithComponents } from "@/lib/meanders-data";
import { ComponentRegistryTable } from "@/components/ComponentRegistryTable";

export default async function DeveloperComponentsPage() {
  const components = await getRoadmapWithComponents();

  const developedCount = components.filter(
    (item) => item.status === "Developed",
  ).length;

  const plannedCount = components.filter(
    (item) => item.status === "Planned",
  ).length;

  return (
    <article className="mx-auto w-full max-w-[var(--content-max-width)] px-6 py-12 lg:px-10 lg:py-16">
      <header className="max-w-4xl border-b border-[var(--color-border)] pb-12">
        <div className="text-label text-[var(--color-accent)]">Developers</div>

        <h1 className="mt-4 text-page-title">Component Registry</h1>

        <p className="mt-5 max-w-3xl text-body text-[var(--color-text-secondary)]">
          A live list of planned and developed Meanders.Tools components.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
            <div className="text-caption">Developed</div>

            <div className="mt-1 text-xl font-semibold">{developedCount}</div>
          </div>

          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
            <div className="text-caption">Planned</div>

            <div className="mt-1 text-xl font-semibold">{plannedCount}</div>
          </div>
        </div>
      </header>

      <section className="mt-12">
        <ComponentRegistryTable components={components} />
      </section>
    </article>
  );
}
