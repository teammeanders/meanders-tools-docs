"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type ComponentItem = {
  id: string;
  name: string;
};

type Group = {
  name: string;
  components: ComponentItem[];
};

type Props = {
  groups: Group[];
};

export function DocumentationNav({ groups }: Props) {
  const pathname = usePathname();

  return (
    <nav>
      {/* Top-level section */}
      <details open className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]">
          <span>Documentation</span>

          <span className="text-sm transition-transform group-open:rotate-90">
            ›
          </span>
        </summary>

        {/* Documentation subsections */}
        <div className="mt-2 space-y-1">
          {groups.map((group) => (
            <details key={group.name} open className="group/sub">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-3 py-1.5 pl-4 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]">
                <span>{group.name}</span>

                <span className="text-sm transition-transform group-open/sub:rotate-90">
                  ›
                </span>
              </summary>

              {/* Components */}
              <div className="mt-0.5 ml-2 border-l border-[var(--color-border-subtle)] pl-2">
                {group.components
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((component) => {
                    const active = pathname === `/components/${component.id}`;

                    return (
                      <Link
                        key={component.id}
                        href={`/components/${component.id}`}
                        className={`relative block rounded-md px-3 py-1.5 text-sm transition-colors ${
                          active
                            ? "bg-[var(--color-accent-soft)] font-medium text-[var(--color-accent)]"
                            : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]"
                        }`}
                      >
                        {component.name}
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
