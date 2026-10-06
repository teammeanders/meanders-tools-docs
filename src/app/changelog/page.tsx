import { getChangelog } from "@/lib/changelog";

export default async function ChangelogPage() {
  const changelog = await getChangelog();

  return (
    <main className="mx-auto w-full max-w-[var(--content-max-width)] px-6 py-14 lg:px-10 lg:py-20">
      <header className="max-w-3xl">
        <div className="text-label text-[var(--color-accent)]">
          Project History
        </div>

        <h1 className="text-page-title mt-4">Changelog</h1>

        <p className="mt-5 text-body text-[var(--color-text-secondary)]">
          Release history and notable changes in Meanders.Tools.
        </p>
      </header>

      <article className="mt-12 max-w-4xl">
        <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-[var(--color-text-secondary)]">
          {changelog}
        </pre>
      </article>
    </main>
  );
}
