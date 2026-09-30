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
