import Link from "next/link";
import { getLatestRelease } from "@/lib/github";
import { getPlugin } from "@/lib/meanders-data";

export default async function InstallationPage() {
  const [release, plugin] = await Promise.all([
    getLatestRelease(),
    getPlugin(),
  ]);

  const version = release.tag_name || plugin.version;

  return (
    <main className="mx-auto w-full max-w-[var(--content-max-width)] px-6 py-14 lg:px-10 lg:py-20">
      {/* Header */}
      <header className="max-w-3xl">
        <div className="text-label text-[var(--color-accent)]">
          Getting Started
        </div>

        <h1 className="text-page-title mt-4">Installation</h1>

        <p className="mt-5 text-body text-[var(--color-text-secondary)]">
          Install Meanders.Tools in Rhino and Grasshopper on Windows.
        </p>
      </header>

      {/* Requirements */}
      <section className="mt-12">
        <h2 className="text-page-heading">Requirements</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <div className="text-caption">Rhino</div>

            <div className="mt-1 font-semibold text-[var(--color-text)]">
              Rhino {plugin.compatibility.rhino.join(", ")}
            </div>
          </div>

          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <div className="text-caption">Grasshopper</div>

            <div className="mt-1 font-semibold text-[var(--color-text)]">
              Grasshopper {plugin.compatibility.grasshopper.join(", ")}
            </div>
          </div>

          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <div className="text-caption">Platform</div>

            <div className="mt-1 font-semibold text-[var(--color-text)]">
              {plugin.compatibility.platforms.join(", ")}
            </div>
          </div>
        </div>
      </section>

      {/* Step 1 */}
      <section className="mt-14">
        <div className="text-label text-[var(--color-text-muted)]">Step 01</div>

        <h2 className="text-page-heading mt-3">Download the latest release</h2>

        <p className="mt-4 max-w-2xl text-body-small text-[var(--color-text-secondary)]">
          Download the latest version of Meanders.Tools from the official GitHub
          release.
        </p>

        <Link
          href="/download"
          className="mt-5 inline-flex rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
        >
          Download {version}
        </Link>
      </section>

      {/* Step 2 */}
      <section className="mt-14">
        <div className="text-label text-[var(--color-text-muted)]">
          Windows Security
        </div>

        <h2 className="text-page-heading mt-3">
          If Windows blocks the downloaded files
        </h2>

        <p className="mt-4 max-w-2xl text-body-small text-[var(--color-text-secondary)]">
          Windows may mark files downloaded from the internet as blocked. If
          Rhino or Grasshopper cannot load the plugin, unblock the downloaded
          files before installing them.
        </p>

        <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <ol className="space-y-3 text-sm text-[var(--color-text-secondary)]">
            <li>
              <span className="font-medium text-[var(--color-text)]">1.</span>{" "}
              Open your Downloads folder.
            </li>

            <li>
              <span className="font-medium text-[var(--color-text)]">2.</span>{" "}
              Right-click the downloaded file and select{" "}
              <span className="text-[var(--color-text)]">Properties</span>.
            </li>

            <li>
              <span className="font-medium text-[var(--color-text)]">3.</span>{" "}
              If you see an{" "}
              <span className="text-[var(--color-text)]">Unblock</span> option
              in the Security section, enable it.
            </li>

            <li>
              <span className="font-medium text-[var(--color-text)]">4.</span>{" "}
              Click <span className="text-[var(--color-text)]">Apply</span> and
              then <span className="text-[var(--color-text)]">OK</span>.
            </li>
          </ol>
        </div>
      </section>

      {/* Step 3 */}
      <section className="mt-14">
        <div className="text-label text-[var(--color-text-muted)]">Step 02</div>

        <h2 className="text-page-heading mt-3">
          Open the Grasshopper Components folder
        </h2>

        <p className="mt-4 max-w-2xl text-body-small text-[var(--color-text-secondary)]">
          In Grasshopper, open the Components folder from the File menu.
        </p>

        <div className="mt-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <code className="text-sm text-[var(--color-accent-light)]">
            File → Special Folders → Components Folder
          </code>
        </div>
      </section>

      {/* Step 4 */}
      <section className="mt-14">
        <div className="text-label text-[var(--color-text-muted)]">Step 03</div>

        <h2 className="text-page-heading mt-3">Copy the release files</h2>

        <p className="mt-4 max-w-2xl text-body-small text-[var(--color-text-secondary)]">
          Copy the downloaded files into the Grasshopper Components folder.
        </p>

        <div className="mt-5 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
          {release.assets.length > 0 ? (
            release.assets.map((asset) => (
              <div
                key={asset.id}
                className="border-b border-[var(--color-border)] px-5 py-4 last:border-b-0"
              >
                <code className="text-sm text-[var(--color-text)]">
                  {asset.name}
                </code>
              </div>
            ))
          ) : (
            <div className="px-5 py-4 text-sm text-[var(--color-text-muted)]">
              No release files are currently available.
            </div>
          )}
        </div>
      </section>

      {/* Step 5 */}
      <section className="mt-14">
        <div className="text-label text-[var(--color-text-muted)]">Step 04</div>

        <h2 className="text-page-heading mt-3">Restart Rhino</h2>

        <p className="mt-4 max-w-2xl text-body-small text-[var(--color-text-secondary)]">
          Close and restart Rhino and Grasshopper. The Meanders tab should then
          appear in Grasshopper.
        </p>
      </section>

      {/* Troubleshooting */}
      <section className="mt-16 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
        <div className="text-section-heading">Troubleshooting</div>

        <p className="mt-3 max-w-2xl text-body-small text-[var(--color-text-secondary)]">
          If Meanders.Tools does not appear, make sure the release files are in
          the correct Components folder and restart Rhino.
        </p>

        <Link
          href="/download"
          className="mt-5 inline-flex text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
        >
          View latest release →
        </Link>
      </section>
    </main>
  );
}
