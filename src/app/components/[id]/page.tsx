import { notFound } from "next/navigation";
import { getComponents } from "@/lib/meanders-data";
import { GrasshopperComponent } from "@/components/GrasshopperComponent";
import { PortList } from "@/components/PortList";

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
    <article className="mx-auto max-w-5xl px-8 py-16">
      <header>
        <div className="text-sm text-neutral-500">
          {component.category} / {component.subcategory}
        </div>

        <h1 className="mt-2 text-4xl font-semibold">{component.name}</h1>

        <p className="mt-4 max-w-3xl text-lg text-neutral-600">
          {component.description.short}
        </p>
      </header>

      <section className="mt-12">
        <GrasshopperComponent component={component} />
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">Description</h2>

        <p className="mt-4 leading-7 text-neutral-700">
          {component.description.long}
        </p>
      </section>

      <div className="mt-14 grid gap-12 lg:grid-cols-2">
        <PortList title="Inputs" ports={component.inputs} />

        <PortList title="Outputs" ports={component.outputs} />
      </div>
    </article>
  );
}
