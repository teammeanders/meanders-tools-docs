import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto flex min-h-20 max-w-[var(--content-max-width)] flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-[var(--color-text-muted)] sm:flex-row">
        <div>© {new Date().getFullYear()} Meanders</div>

        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="transition-colors hover:text-[var(--color-text)]"
          >
            Home
          </Link>

          <Link
            href="/changelog"
            className="transition-colors hover:text-[var(--color-text)]"
          >
            Changelog
          </Link>

          <a
            href="https://github.com/teammeanders/Meanders.Tools"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[var(--color-text)]"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
