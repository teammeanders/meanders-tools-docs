"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type ComponentItem = {
  id: string;
  name: string;
};

type ComponentGroup = {
  name: string;
  components: ComponentItem[];
};

type ParameterItem = {
  id: string;
  name: string;
};

type ParameterGroup = {
  name: string;
  parameters: ParameterItem[];
};

type Props = {
  componentGroups: ComponentGroup[];
  parameterGroups: ParameterGroup[];
};

type DocumentationItem = {
  id: string;
  name: string;
  type: "component" | "parameter";
};

type DocumentationGroup = {
  name: string;
  items: DocumentationItem[];
};

export function DocumentationNav({ componentGroups, parameterGroups }: Props) {
  const pathname = usePathname();

  /*
   * Merge components and parameters into the same
   * documentation hierarchy.
   *
   * Example:
   *
   * Components:
   *   Attributes
   *   Objects
   *   Utilities
   *
   * Parameters:
   *   Params
   *
   * Result:
   *
   * Documentation
   *   Attributes
   *   Objects
   *   Params
   *   Utilities
   */

  const groups = new Map<string, DocumentationItem[]>();

  for (const group of componentGroups) {
    const items = groups.get(group.name) ?? [];

    items.push(
      ...group.components.map((component) => ({
        id: component.id,
        name: component.name,
        type: "component" as const,
      })),
    );

    groups.set(group.name, items);
  }

  for (const group of parameterGroups) {
    const items = groups.get(group.name) ?? [];

    items.push(
      ...group.parameters.map((parameter) => ({
        id: parameter.id,
        name: parameter.name,
        type: "parameter" as const,
      })),
    );

    groups.set(group.name, items);
  }

  const documentationGroups: DocumentationGroup[] = Array.from(groups.entries())
    .map(([name, items]) => ({
      name,
      items: items.sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <nav>
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg  px-3 py-2.5 text-sm font-semibold text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent-border)] hover:text-[var(--color-accent)]">
          <span>Documentation</span>

          <span className="text-sm transition-transform group-open:rotate-90">
            ›
          </span>
        </summary>

        <div className="mt-2 space-y-1">
          {documentationGroups.map((group) => (
            <details key={group.name} className="group/category">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-3 py-1.5 pl-4 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]">
                <span>{group.name}</span>

                <span className="text-sm transition-transform group-open/category:rotate-90">
                  ›
                </span>
              </summary>

              <div className="mt-0.5 ml-2 border-l border-[var(--color-border-subtle)] pl-2">
                {group.items.map((item) => {
                  const href =
                    item.type === "component"
                      ? `/components/${item.id}`
                      : `/parameters/${item.id}`;

                  const active = pathname === href;

                  return (
                    <Link
                      key={`${item.type}-${item.id}`}
                      href={href}
                      className={`block rounded-md px-3 py-1.5 text-xs transition-colors ${
                        active
                          ? "bg-[var(--color-accent-soft)] font-medium text-[var(--color-accent)]"
                          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </details>
          ))}
        </div>
      </details>
    </nav>
  );
}
