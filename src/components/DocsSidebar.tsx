import {
  getComponents,
  groupComponents,
  groupParameters,
} from "@/lib/meanders-data";

import { DocsSidebarContent } from "@/components/DocsSidebarContent";

export async function DocsSidebar() {
  const data = await getComponents();

  const componentGroups = groupComponents(data.components);

  const parameterGroups = groupParameters(data.parameters);

  return (
    <DocsSidebarContent
      componentGroups={componentGroups}
      parameterGroups={parameterGroups}
    />
  );
}
