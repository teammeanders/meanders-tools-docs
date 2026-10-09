import type { ComponentsData, RoadmapComponent } from "@/types/meanders";

const RAW_BASE =
  "https://raw.githubusercontent.com/teammeanders/Meanders.Tools/master/";

const COMPONENTS_URL = `${RAW_BASE}data/components.json`;

const PLUGIN_URL = `${RAW_BASE}data/plugin.json`;

const ROADMAP_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQEKGJheipR1VayOqQDMAUFkdjau_Oqpv7cI7TGqheo3Oi8158XMR-RD8TnGXXQz-62vJcgMYIf23d_/pub?output=csv";

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

/* ==================================================
   Components
   ================================================== */

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

/* ==================================================
   Plugin
   ================================================== */

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

/* ==================================================
   Component Groups
   ================================================== */

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

/* ==================================================
   Parameter Groups
   ================================================== */

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

/* ==================================================
   Component Roadmap
   ================================================== */

/*
 * Published Google Sheet CSV.
 *
 * Current columns:
 *
 * Full Name | ID | Sub-Category
 */

/*
 * Basic CSV parser.
 *
 * Supports:
 * - comma-separated values
 * - quoted values
 * - commas inside quoted values
 * - escaped quotes
 * - Windows / Unix line endings
 */
function parseCsv(csv: string): string[][] {
  const rows: string[][] = [];

  let row: string[] = [];
  let value = "";

  let quoted = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];

    /*
     * Quote
     */
    if (char === '"') {
      /*
       * Escaped quote:
       *
       * ""
       */
      if (quoted && csv[i + 1] === '"') {
        value += '"';

        i++;

        continue;
      }

      quoted = !quoted;

      continue;
    }

    /*
     * Column separator
     */
    if (char === "," && !quoted) {
      row.push(value.trim());

      value = "";

      continue;
    }

    /*
     * Row separator
     */
    if ((char === "\n" || char === "\r") && !quoted) {
      /*
       * Windows CRLF
       */
      if (char === "\r" && csv[i + 1] === "\n") {
        i++;
      }

      row.push(value.trim());

      value = "";

      /*
       * Ignore empty rows.
       */
      if (row.some((cell) => cell.length > 0)) {
        rows.push(row);
      }

      row = [];

      continue;
    }

    value += char;
  }

  /*
   * Last row
   */
  if (value.length > 0 || row.length > 0) {
    row.push(value.trim());

    if (row.some((cell) => cell.length > 0)) {
      rows.push(row);
    }
  }

  return rows;
}

/*
 * Load roadmap from Google Sheet
 * and determine development state
 * from GitHub component metadata.
 */
export async function getRoadmapWithComponents(): Promise<RoadmapComponent[]> {
  /*
   * Load both sources in parallel.
   */
  const [csvResponse, componentData] = await Promise.all([
    fetch(ROADMAP_CSV_URL, {
      next: {
        revalidate: 60,
      },
    }),

    getComponents(),
  ]);

  /*
   * Check Google response.
   */
  if (!csvResponse.ok) {
    throw new Error(
      `Failed to load the component roadmap. HTTP ${csvResponse.status}`,
    );
  }

  /*
   * Read CSV text.
   */
  const csv = await csvResponse.text();

  /*
   * Parse CSV.
   */
  const rows = parseCsv(csv);

  /*
   * Empty sheet.
   */
  if (rows.length < 2) {
    return [];
  }

  /*
   * Normalize headers.
   *
   * Google currently returns:
   *
   * Full Name
   * ID
   * Sub-Category
   */
  const headers = rows[0].map((header) =>
    header
      .replace(/^\uFEFF/, "")
      .trim()
      .toLowerCase(),
  );

  const nameIndex = headers.indexOf("full name");

  const idIndex = headers.indexOf("id");

  const categoryIndex = headers.indexOf("sub-category");

  /*
   * Validate Sheet structure.
   */
  if (nameIndex === -1 || idIndex === -1 || categoryIndex === -1) {
    throw new Error(
      [
        "The component roadmap must contain Full Name, ID, and Sub-Category columns.",

        "",

        `Received headers: ${headers.join(", ")}`,
      ].join("\n"),
    );
  }

  /*
   * Convert Sheet rows into
   * component registry entries.
   */
  return (
    rows
      .slice(1)

      /*
       * Read the three Sheet columns.
       */
      .map((row) => ({
        name: row[nameIndex]?.trim() ?? "",

        id: row[idIndex]?.trim() ?? "",

        category: row[categoryIndex]?.trim() ?? "",
      }))

      /*
       * Ignore incomplete rows.
       */
      .filter((item) => item.name.length > 0 && item.id.length > 0)

      /*
       * Merge with GitHub.
       */
      .map((item) => {
        /*
         * Find component by ID.
         */
        const component = componentData.components.find(
          (candidate) => candidate.id === item.id,
        );

        /*
         * If the component exists
         * in GitHub metadata:
         *
         * Developed
         *
         * Otherwise:
         *
         * Planned
         */
        return {
          ...item,

          status: component ? "Developed" : "Planned",

          /*
           * Current version comes
           * from introducedIn.
           */
          version: component?.introducedIn ?? null,

          /*
           * Documentation exists
           * when the component exists
           * in the generated GitHub data.
           */
          docsAvailable: Boolean(component),
        };
      })
  );
}
