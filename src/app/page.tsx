import { ComponentCard } from "@/components/ComponentCard";
import { getComponents } from "@/lib/meanders-data";

export default async function Home() {
  const data = await getComponents();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <header>
        <p className="text-sm font-medium text-neutral-500">Meanders</p>

        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          Meanders.Tools
        </h1>

        <p className="mt-4 max-w-2xl text-neutral-600">
          Design and workflow tools for Grasshopper and Rhino.
        </p>
      </header>

      <section className="mt-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Components</h2>

            <p className="mt-1 text-sm text-neutral-500">
              {data.components.length} available components
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.components.map((component) => (
            <ComponentCard key={component.id} component={component} />
          ))}
        </div>
      </section>
    </main>
  );
}
