import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur">
      <div className="mx-auto ml-10 flex h-full max-w-[var(--content-max-width)] items-center justify-between px-6 lg:ml-auto">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight transition-colors hover:text-[var(--color-accent)]"
        >
          Meanders<span className="text-[var(--color-accent)]">.Tools</span>
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href="https://github.com/teammeanders/Meanders.Tools"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)]"
          >
            GitHub
          </a>

          <a
            href="https://tools.meanders-dfh.com/download"
            className="rounded-md border border-[var(--color-accent-border)] bg-[var(--color-accent-soft)] px-3 py-1.5 text-sm font-medium text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)]"
          >
            Download
          </a>
        </div>
      </div>
    </header>
  );
}
