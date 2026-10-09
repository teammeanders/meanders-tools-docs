"use client";

import { useMemo, useState } from "react";
import type { RoadmapComponent } from "@/types/meanders";

type SortKey = "name" | "id" | "category" | "status" | "version";

type SortDirection = "asc" | "desc";

type Props = {
  components: RoadmapComponent[];
};

export function ComponentRegistryTable({ components }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("name");

  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const sortedComponents = useMemo(() => {
    return [...components].sort((a, b) => {
      const aValue = getSortValue(a, sortKey);

      const bValue = getSortValue(b, sortKey);

      const comparison = aValue.localeCompare(bValue, undefined, {
        numeric: true,
        sensitivity: "base",
      });

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [components, sortKey, sortDirection]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));

      return;
    }

    setSortKey(key);
    setSortDirection("asc");
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
          <tr>
            <SortableHeader
              label="Name"
              column="name"
              activeColumn={sortKey}
              direction={sortDirection}
              onSort={handleSort}
            />

            <SortableHeader
              label="ID"
              column="id"
              activeColumn={sortKey}
              direction={sortDirection}
              onSort={handleSort}
            />

            <SortableHeader
              label="Category"
              column="category"
              activeColumn={sortKey}
              direction={sortDirection}
              onSort={handleSort}
            />

            <SortableHeader
              label="Status"
              column="status"
              activeColumn={sortKey}
              direction={sortDirection}
              onSort={handleSort}
            />

            <SortableHeader
              label="Version"
              column="version"
              activeColumn={sortKey}
              direction={sortDirection}
              onSort={handleSort}
            />

            <th className="px-5 py-3 font-medium">Docs</th>
          </tr>
        </thead>

        <tbody>
          {sortedComponents.map((item) => (
            <tr key={item.id} className="border-t border-[var(--color-border)]">
              <td className="px-5 py-4 font-medium text-[var(--color-text)]">
                {item.name}
              </td>

              <td className="px-5 py-4 font-mono text-xs text-[var(--color-text-muted)]">
                {item.id}
              </td>

              <td className="px-5 py-4 text-[var(--color-text-secondary)]">
                {item.category}
              </td>

              <td className="px-5 py-4">
                <span
                  className={
                    item.status === "Developed"
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text-muted)]"
                  }
                >
                  {item.status}
                </span>
              </td>

              <td className="px-5 py-4 text-[var(--color-text-secondary)]">
                {item.version ?? "—"}
              </td>

              <td className="px-5 py-4">
                {item.docsAvailable ? (
                  <a
                    href={`/components/${item.id}`}
                    className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
                  >
                    View docs →
                  </a>
                ) : (
                  <span className="text-[var(--color-text-muted)]">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getSortValue(item: RoadmapComponent, key: SortKey): string {
  switch (key) {
    case "name":
      return item.name;

    case "id":
      return item.id;

    case "category":
      return item.category;

    case "status":
      return item.status;

    case "version":
      return item.version ?? "";

    default:
      return "";
  }
}

function SortableHeader({
  label,
  column,
  activeColumn,
  direction,
  onSort,
}: {
  label: string;
  column: SortKey;
  activeColumn: SortKey;
  direction: SortDirection;
  onSort: (column: SortKey) => void;
}) {
  const active = activeColumn === column;

  return (
    <th className="px-5 py-3 font-medium">
      <button
        type="button"
        onClick={() => onSort(column)}
        className="inline-flex items-center gap-2 transition-colors hover:text-[var(--color-text)]"
      >
        <span>{label}</span>

        <span
          className={
            active
              ? "text-[var(--color-accent)]"
              : "text-[var(--color-text-muted)]"
          }
        >
          {active ? (direction === "asc" ? "↑" : "↓") : "↕"}
        </span>
      </button>
    </th>
  );
}
