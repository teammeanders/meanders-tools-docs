"use client";

type Props = {
  content: string;
};

function renderInline(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

export function ChangelogRenderer({ content }: Props) {
  const lines = content.split("\n");

  return (
    <div className="space-y-1">
      {lines.map((line, index) => {
        const key = `${index}-${line}`;

        if (line.startsWith("# ")) {
          return null;
        }

        if (line.startsWith("## ")) {
          return (
            <h2
              key={key}
              className="mt-12 border-b border-[var(--color-border)] pb-4 text-page-heading"
            >
              {line.slice(3)}
            </h2>
          );
        }

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
      })}
    </div>
  );
}
