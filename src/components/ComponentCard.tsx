import type { MeandersComponent } from "@/types/meanders";

type Props = {
  component: MeandersComponent;
};

export function ComponentCard({ component }: Props) {
  return (
    <article className="rounded-xl border border-neutral-200 p-5">
      <div className="text-xs text-neutral-500">{component.subcategory}</div>

      <h2 className="mt-2 text-xl font-semibold">{component.name}</h2>

      <p className="mt-2 text-sm text-neutral-600">
        {component.description.short}
      </p>

      <div className="mt-4 flex gap-2 text-xs text-neutral-500">
        <span>{component.nickname}</span>
        <span>•</span>
        <span>v{component.introducedIn}</span>
      </div>
    </article>
  );
}
