import Link from "next/link";
import { getComponents } from "@/lib/meanders-data";
import { DocumentationNav } from "@/components/DocumentationNav";

export async function DocsSidebar() {
  const data = await getComponents();

  const groups = data.components.reduce<Record<string, typeof data.components>>(
    (acc, component) => {
      acc[component.subcategory] ??= [];
      acc[component.subcategory].push(component);

      return acc;
    },
    {},
  );

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[var(--sidebar-width)] shrink-0 overflow-y-auto border-r border-[var(--color-border)] bg-[var(--color-surface)] lg:block">
      <nav className="px-4 py-6">
        {/* Main navigation */}
        <div className="space-y-1">
          <Link
            href="/"
            className="block rounded-md px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]"
          >
            Home
          </Link>

          <Link
            href="/changelog"
            className="block rounded-md px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]"
          >
            Changelog
          </Link>

          <Link
            href="/download"
            className="block rounded-md px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]"
          >
            Download
          </Link>
        </div>

        {/* Documentation */}
        <DocumentationNav
          groups={Object.entries(groups).map(([name, components]) => ({
            name,
            components: components
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((component) => ({
                id: component.id,
                name: component.name,
              })),
          }))}
        />
      </nav>
    </aside>
  );
}
