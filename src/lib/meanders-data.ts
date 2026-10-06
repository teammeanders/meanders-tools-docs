import type { ComponentsData } from "@/types/meanders";

const COMPONENTS_URL =
  "https://raw.githubusercontent.com/teammeanders/Meanders.Tools/master/data/components.json";

export async function getComponents(): Promise<ComponentsData> {
  const response = await fetch(COMPONENTS_URL, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load Meanders component data.");
  }

  return response.json();
}

export function groupComponents(components: ComponentsData["components"]) {
  return Object.entries(
    components.reduce<Record<string, ComponentsData["components"]>>(
      (acc, component) => {
        acc[component.subcategory] ??= [];
        acc[component.subcategory].push(component);

        return acc;
      },
      {},
    ),
  ).map(([name, components]) => ({
    name,
    components: components.sort((a, b) => a.name.localeCompare(b.name)),
  }));
}
