"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { DocumentationNav } from "@/components/DocumentationNav";

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

export function DocsSidebarContent({
  componentGroups,
  parameterGroups,
}: Props) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const developersActive =
    pathname === "/developers" || pathname.startsWith("/developers/");

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[var(--sidebar-width)] shrink-0 overflow-y-auto border-r border-[var(--color-border)] bg-[var(--color-surface)] lg:block">
      <nav className="px-4 py-6">
        <div className="space-y-1">
          {/* Home */}
          <Link
            href="/"
            className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/")
                ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]"
            }`}
          >
            Home
          </Link>

          {/* Installation */}
          <Link
            href="/installation"
            className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/installation")
                ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]"
            }`}
          >
            Installation
          </Link>

          {/* Changelog */}
          <Link
            href="/changelog"
            className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/changelog")
                ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]"
            }`}
          >
            Changelog
          </Link>

          {/* Developers */}
          <details className="group" open={developersActive}>
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]">
              <span
                className={developersActive ? "text-[var(--color-accent)]" : ""}
              >
                Developers
              </span>

              <span className="text-sm transition-transform group-open:rotate-90">
                ›
              </span>
            </summary>

            <div className="mt-1 ml-2 space-y-0.5 border-l border-[var(--color-border-subtle)] pl-2">
              {/* Guide */}
              <Link
                href="/developers"
                className={`block rounded-md px-3 py-1.5 text-xs transition-colors ${
                  isActive("/developers")
                    ? "bg-[var(--color-accent-soft)] font-medium text-[var(--color-accent)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]"
                }`}
              >
                Guide
              </Link>

              {/* Component Registry */}
              <Link
                href="/developers/components"
                className={`block rounded-md px-3 py-1.5 text-xs transition-colors ${
                  isActive("/developers/components")
                    ? "bg-[var(--color-accent-soft)] font-medium text-[var(--color-accent)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]"
                }`}
              >
                Component Registry
              </Link>
            </div>
          </details>

          {/* Download */}
          <Link
            href="/download"
            className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive("/download")
                ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)]"
            }`}
          >
            Download
          </Link>
        </div>

        {/* Documentation */}
        <div>
          <DocumentationNav
            componentGroups={componentGroups}
            parameterGroups={parameterGroups}
          />
        </div>
      </nav>
    </aside>
  );
}
