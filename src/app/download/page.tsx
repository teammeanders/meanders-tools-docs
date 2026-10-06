import Link from "next/link";
import { getLatestRelease } from "@/lib/github";

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export default async function DownloadPage() {
  const release = await getLatestRelease();

  return (
    <main className="mx-auto w-full max-w-[var(--content-max-width)] px-6 py-14 lg:px-10 lg:py-20">
      {/* Header */}
      <header className="max-w-3xl">
        <div className="text-label text-[var(--color-accent)]">Download</div>

        <h1 className="text-page-title mt-4">Latest Release</h1>

        <p className="mt-5 text-body text-[var(--color-text-secondary)]">
          Download the latest internal release of Meanders.Tools for Rhino and
          Grasshopper.
        </p>
      </header>

      {/* Release */}
      <section className="mt-12 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="border-b border-[var(--color-border)] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-caption">Latest release</div>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                {release.name || release.tag_name}
              </h2>

              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Published {formatDate(release.published_at)}
              </p>
            </div>

            <a
              href={release.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
            >
              View on GitHub →
            </a>
          </div>
        </div>

        {/* Assets */}
        <div className="p-6 sm:p-8">
          <div className="text-section-heading">Downloads</div>

          <div className="mt-5 divide-y divide-[var(--color-border)] rounded-lg border border-[var(--color-border)]">
            {release.assets.map((asset) => (
              <a
                key={asset.id}
                href={asset.browser_download_url}
                className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-[var(--color-surface-elevated)]"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-[var(--color-text)]">
                    {asset.name}
                  </div>

                  <div className="mt-1 text-xs text-[var(--color-text-muted)]">
                    {formatBytes(asset.size)}
                  </div>
                </div>

                <span className="shrink-0 text-sm font-medium text-[var(--color-accent)]">
                  Download
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Compatibility */}
      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="text-caption">Rhino</div>

          <div className="mt-1 font-semibold">Rhino 7</div>
        </div>

        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="text-caption">Grasshopper</div>

          <div className="mt-1 font-semibold">Grasshopper 7</div>
        </div>

        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="text-caption">Platform</div>

          <div className="mt-1 font-semibold">Windows</div>
        </div>
      </section>

      {/* Installation */}
      <section className="mt-12 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
        <div className="text-section-heading">Installation</div>

        <p className="mt-3 max-w-2xl text-body-small text-[var(--color-text-secondary)]">
          Download the required release assets and copy them into the
          Grasshopper Components folder.
        </p>

        <Link
          href="/installation"
          className="mt-5 inline-flex rounded-md border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-accent-border)] hover:text-[var(--color-accent)]"
        >
          Installation Guide →
        </Link>
      </section>
    </main>
  );
}
