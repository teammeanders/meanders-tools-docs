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
