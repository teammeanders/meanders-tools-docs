import type { MeandersComponent } from "@/types/meanders";

type Props = {
  component: MeandersComponent;
};

export function ComponentCard({ component }: Props) {
  return (
    <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-accent-border)] hover:bg-[var(--color-surface-elevated)]">
      <div className="text-xs font-medium text-[var(--color-text-muted)]">
        {component.subcategory}
      </div>

      <h2 className="mt-2 text-xl font-semibold text-[var(--color-text)]">
        {component.name}
      </h2>

      <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
        {component.description.short}
      </p>

      <div className="mt-4 flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
        <span>{component.nickname}</span>

        <span className="text-[var(--color-border)]">•</span>

        <span>v{component.introducedIn}</span>
      </div>
    </article>
  );
}
