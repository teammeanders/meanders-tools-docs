import type { ComponentsData } from "@/types/meanders";

const RAW_BASE =
  "https://raw.githubusercontent.com/teammeanders/Meanders.Tools/master/";

const COMPONENTS_URL = `${RAW_BASE}data/components.json`;

const PLUGIN_URL = `${RAW_BASE}data/plugin.json`;

export interface PluginData {
  id: string;
  name: string;
  displayName: string;

  version: string;
  status: string;

  description: {
    short: string;
    long: string;
  };

  author: {
    name: string;
    contact: string;
  };

  repository: {
    provider: string;
    owner: string;
    name: string;
  };

  compatibility: {
    rhino: string[];
    grasshopper: string[];
    platforms: string[];
    frameworks: string[];
  };

  distribution: {
    channel: string;
    githubReleases: boolean;
    yak: boolean;
    installer: boolean;
  };

  documentation: {
    status: string;
    website: string | null;
  };

  release: {
    current: string;
    stable: string | null;
    releaseDate: string | null;
  };

  assembly: {
    name: string;
    grasshopperName: string;
    assemblyGuid: string;
  };
}

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

export async function getPlugin(): Promise<PluginData> {
  const response = await fetch(PLUGIN_URL, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load Meanders plugin data.");
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

export function groupParameters(parameters: ComponentsData["parameters"]) {
  return Object.entries(
    parameters.reduce<Record<string, ComponentsData["parameters"]>>(
      (acc, parameter) => {
        acc[parameter.subcategory] ??= [];
        acc[parameter.subcategory].push(parameter);

        return acc;
      },
      {},
    ),
  ).map(([name, parameters]) => ({
    name,
    parameters: parameters.sort((a, b) => a.name.localeCompare(b.name)),
  }));
}


const ROADMAP_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQEKGJheipR1VayOqQDMAUFkdjau_Oqpv7cI7TGqheo3Oi8158XMR-RD8TnGXXQz-62vJcgMYIf23d_/pub?output=csv";

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let value = "";
  let quoted = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (quoted && line[i + 1] === '"') {
        value += '"';
        i++;
      } else {
        quoted = !quoted;
      }
      continue;
    }

    if (char === "," && !quoted) {
      values.push(value.trim());
      value = "";
      continue;
    }

    value += char;
  }

  values.push(value.trim());
  return values;
}

function parseCsv(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = "";
  let quoted = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];

    if (char === '"') {
      if (quoted && csv[i + 1] === '"') {
        value += '"';
        i++;
      } else {
        quoted = !quoted;
      }
      continue;
    }

    if (char === "," && !quoted) {
      row.push(value.trim());
      value = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && csv[i + 1] === "\n") i++;
      row.push(value.trim());
      value = "";

      if (row.some((cell) => cell.length > 0)) {
        rows.push(row);
      }

      row = [];
      continue;
    }

    value += char;
  }

  if (value.length > 0 || row.length > 0) {
    row.push(value.trim());
    if (row.some((cell) => cell.length > 0)) rows.push(row);
  }

  return rows;
}

export async function getRoadmapComponents(): Promise<RoadmapComponent[]> {
  const response = await fetch(ROADMAP_CSV_URL, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load the component roadmap.");
  }

  const rows = parseCsv(await response.text());

  if (rows.length < 2) {
    return [];
  }

  const headers = rows[0].map((header) =>
    header.replace(/^\uFEFF/, "").trim().toLowerCase(),
  );

  const nameIndex = headers.indexOf("name");
  const idIndex = headers.indexOf("id");
  const categoryIndex = headers.indexOf("category");

  if (nameIndex === -1 || idIndex === -1 || categoryIndex === -1) {
    throw new Error(
      "The component roadmap must contain Name, ID, and Category columns.",
    );
  }

  return rows.slice(1)
    .map((row) => ({
      name: row[nameIndex] ?? "",
      id: row[idIndex] ?? "",
      category: row[categoryIndex] ?? "",
    }))
    .filter((item) => item.id && item.name)
    .map((item) => {
      const implemented = componentsCacheHasId(item.id);

      return {
        ...item,
        status: implemented ? "Developed" : "Planned",
        version: implemented ? componentsCacheGetVersion(item.id) : null,
        docsAvailable: implemented,
      };
    });
}

let componentsCache: ComponentsData | null = null;

function componentsCacheHasId(id: string): boolean {
  if (!componentsCache) return false;
  return componentsCache.components.some((component) => component.id === id);
}

function componentsCacheGetVersion(id: string): string | null {
  if (!componentsCache) return null;
  const component = componentsCache.components.find((item) => item.id === id);
  return component?.introducedIn ?? null;
}

export async function getRoadmapWithComponents(): Promise<RoadmapComponent[]> {
  const data = await getComponents();
  componentsCache = data;

  try {
    return await getRoadmapComponents();
  } finally {
    componentsCache = null;
  }
}
