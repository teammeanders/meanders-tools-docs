"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

type DocumentationItem = {
  id: string;
  name: string;
  type: "component" | "parameter";
};

type DocumentationGroup = {
  name: string;
  items: DocumentationItem[];
};

type Props = {
  componentGroups: ComponentGroup[];
  parameterGroups: ParameterGroup[];
};

export function MobileMenu({ componentGroups, parameterGroups }: Props) {
  const [open, setOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const pathname = usePathname();

  const close = () => setOpen(false);

  /*
   * Merge Components and Parameters into the same
   * documentation hierarchy.
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
    <div className="lg:hidden">
      {/* Mobile header button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        className="fixed left-4 top-4 z-[60] flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]"
      >
        <span className="text-lg">☰</span>
      </button>

      {/* Overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={close}
          className="fixed inset-0 z-[70] bg-black/60"
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed left-0 top-0 z-[80] h-screen w-[290px] overflow-y-auto border-r border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-2xl transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={close}
            className="font-semibold tracking-tight"
          >
            Meanders
            <span className="text-[var(--color-accent)]">.Tools</span>
          </Link>

          <button
            type="button"
            onClick={close}
            aria-label="Close navigation"
            className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-text-muted)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]"
          >
            ×
          </button>
        </div>

        {/* Main navigation */}
        <nav className="mt-8 space-y-1">
          <Link
            href="/"
            onClick={close}
            className="block rounded-md px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]"
          >
            Home
          </Link>

          <Link
            href="/installation"
            onClick={close}
            className="block rounded-md px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]"
          >
            Installation
          </Link>

          <Link
            href="/changelog"
            onClick={close}
            className="block rounded-md px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]"
          >
            Changelog
          </Link>

          <Link
            href="/download"
            onClick={close}
            className="block rounded-md px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]"
          >
            Download
          </Link>
        </nav>

        {/* Documentation */}
        <div>
          <button
            type="button"
            onClick={() => setDocsOpen((value) => !value)}
            className="flex w-full items-center justify-between rounded-lg py-2 px-3 text-xs font-semibold  text-[var(--color-text-secondary)]"
          >
            <span>Documentation</span>

            <span
              className={`transition-transform ${docsOpen ? "rotate-90" : ""}`}
            >
              ›
            </span>
          </button>

          {docsOpen && (
            <div className="mt-3 space-y-1">
              {documentationGroups.map((group) => {
                const isOpen = openGroups[group.name] ?? false;

                return (
                  <div key={group.name}>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenGroups((current) => ({
                          ...current,
                          [group.name]: !isOpen,
                        }))
                      }
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 pl-4 text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)]"
                    >
                      <span>{group.name}</span>

                      <span
                        className={`transition-transform ${
                          isOpen ? "rotate-90" : ""
                        }`}
                      >
                        ›
                      </span>
                    </button>

                    {isOpen && (
                      <div className="ml-2 border-l border-[var(--color-border-subtle)] pl-2">
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
                              onClick={close}
                              className={`block rounded-md px-3 py-2 text-sm ${
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
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
