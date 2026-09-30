import Link from "next/link";
import { getComponents } from "@/lib/meanders-data";

export async function DocsSidebar() {
  const data = await getComponents();

  const groups = Object.groupBy(
    data.components,
    (component) => component.subcategory,
  );

  return (
    <aside className="sticky top-0 h-screen w-72 shrink-0 border-r border-neutral-200 bg-white p-6">
      <Link href="/" className="text-lg font-semibold">
        Meanders.Tools
      </Link>

      <nav className="mt-8 space-y-7">
        {Object.entries(groups).map(([category, components]) => (
          <div key={category}>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {category}
            </div>

            <div className="space-y-1">
              {components?.map((component) => (
                <Link
                  key={component.id}
                  href={`/components/${component.id}`}
                  className="block rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  {component.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
