"use client";

type Props = {
  content: string;
};

function renderInline(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

type Release = {
  title: string;
  lines: string[];
};

function parseReleases(content: string): Release[] {
  const lines = content.split("\n");
  const releases: Release[] = [];
  let current: Release | null = null;

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (current) {
        releases.push(current);
      }

      current = {
        title: line.slice(3),
        lines: [],
      };

      continue;
    }

    if (current) {
      current.lines.push(line);
    }
  }

  if (current) {
    releases.push(current);
  }

  return releases;
}

function renderReleaseLine(line: string, index: number) {
  const key = `${index}-${line}`;

  if (line.startsWith("### ")) {
    return (
      <h3 key={key} className="mt-8 text-section-heading">
        {line.slice(4)}
      </h3>
    );
  }

  if (line.startsWith("- ")) {
    return (
      <div
        key={key}
        className="flex gap-3 py-1 text-body-small text-[var(--color-text-secondary)]"
      >
        <span className="text-[var(--color-accent)]">•</span>

        <span
          dangerouslySetInnerHTML={{
            __html: renderInline(line.slice(2)),
          }}
        />
      </div>
    );
  }

  if (line.trim() === "") {
    return <div key={key} className="h-3" />;
  }

  return (
    <p
      key={key}
      className="text-body-small text-[var(--color-text-secondary)]"
      dangerouslySetInnerHTML={{
        __html: renderInline(line),
      }}
    />
  );
}

export function ChangelogRenderer({ content }: Props) {
  const releases = parseReleases(content);

  return (
    <div className="space-y-3">
      {releases.map((release, releaseIndex) => (
        <details
          key={`${releaseIndex}-${release.title}`}
          open={releaseIndex === 0}
          className="group overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-[var(--color-surface-elevated)] sm:px-6">
            <span className="text-page-heading">{release.title}</span>

            <span
              aria-hidden="true"
              className="shrink-0 text-lg text-[var(--color-text-muted)] transition-transform duration-200 group-open:rotate-180"
            >
              ↓
            </span>
          </summary>

          <div className="border-t border-[var(--color-border)] px-5 pb-6 pt-2 sm:px-6">
            {release.lines.map((line, index) => renderReleaseLine(line, index))}
          </div>
        </details>
      ))}
    </div>
  );
}
