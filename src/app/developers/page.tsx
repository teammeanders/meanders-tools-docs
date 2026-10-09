import fs from "fs/promises";
import { getRoadmapWithComponents } from "@/lib/meanders-data";
import path from "path";
import type { ReactNode } from "react";

function renderLines(markdown: string): ReactNode[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const output: ReactNode[] = [];
  let list: string[] = [];
  let ordered: string[] = [];
  let code: string[] | null = null;

  const flush = () => {
    if (list.length) {
      output.push(
        <ul key={"ul-" + output.length} className="mt-4 space-y-2 pl-6 text-body-small text-[var(--color-text-secondary)]">
          {list.map((item, i) => <li key={i} className="list-disc pl-1">{item}</li>)}
        </ul>,
      );
      list = [];
    }
    if (ordered.length) {
      output.push(
        <ol key={"ol-" + output.length} className="mt-4 space-y-2 pl-6 text-body-small text-[var(--color-text-secondary)]">
          {ordered.map((item, i) => <li key={i} className="list-decimal pl-1">{item}</li>)}
        </ol>,
      );
      ordered = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("~~~")) {
      flush();
      if (code === null) { code = []; }
      else {
        output.push(
          <pre key={"code-" + output.length} className="mt-5 overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[#0a0c0e] p-5 text-sm leading-6 text-[var(--color-text-secondary)]">
            <code>{code.join("\n")}</code>
          </pre>,
        );
        code = null;
      }
      continue;
    }

    if (code !== null) { code.push(line); continue; }

    if (!line.trim()) { flush(); continue; }

    if (line.startsWith("# ")) {
      flush();
      output.push(<h1 key={"h1-" + output.length} className="text-page-title">{line.slice(2)}</h1>);
      continue;
    }
    if (line.startsWith("## ")) {
      flush();
      output.push(<h2 key={"h2-" + output.length} className="mt-16 border-t border-[var(--color-border)] pt-10 text-page-heading">{line.slice(3)}</h2>);
      continue;
    }
    if (line.startsWith("### ")) {
      flush();
      output.push(<h3 key={"h3-" + output.length} className="mt-8 text-section-heading">{line.slice(4)}</h3>);
      continue;
    }
    if (line.startsWith("- ")) {
      if (ordered.length) flush();
      list.push(line.slice(2));
      continue;
    }
    if (/^\d+\. /.test(line)) {
      if (list.length) flush();
      ordered.push(line.replace(/^\d+\. /, ""));
      continue;
    }

    flush();
    output.push(<p key={"p-" + output.length} className="mt-5 max-w-4xl text-body text-[var(--color-text-secondary)]">{line}</p>);
  }

  flush();
  return output;
}

export default async function DevelopersPage() {
  const filePath = path.join(process.cwd(), "docs", "developers.md");
  const markdown = await fs.readFile(filePath, "utf8");
  const [content, roadmap] = await Promise.all([\n    Promise.resolve(renderLines(markdown)),\n    getRoadmapWithComponents(),\n  ]);

  return (
    <article className="mx-auto w-full max-w-[var(--content-max-width)] px-6 py-12 lg:px-10 lg:py-16">
      <header className="max-w-4xl border-b border-[var(--color-border)] pb-12">
        <div className="text-label text-[var(--color-accent)]">Development</div>
        <div className="mt-4">{content[0]}</div>
        <p className="mt-5 max-w-3xl text-body text-[var(--color-text-secondary)]">
          Everything needed to build, test, document, and ship a Meanders.Tools component.
        </p>
      </header>
      <div className="max-w-4xl">{content.slice(1)}</div>

      <section className="mt-16 border-t border-[var(--color-border)] pt-10">
        <div className="text-label text-[var(--color-accent)]">Project</div>
        <h2 className="mt-2 text-page-heading">Component Registry</h2>
        <p className="mt-4 max-w-3xl text-body-small text-[var(--color-text-secondary)]">
          The roadmap is maintained in the project planning sheet. Development
          status, version, and documentation availability are derived from the
          component metadata in GitHub.
        </p>

        <div className="mt-8 overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">ID</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Version</th>
                <th className="px-5 py-3 font-medium">Docs</th>
              </tr>
            </thead>
            <tbody>
              {roadmap.map((item) => (
                <tr key={item.id} className="border-t border-[var(--color-border)]">
                  <td className="px-5 py-4 font-medium text-[var(--color-text)]">
                    {item.name}
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-[var(--color-text-muted)]">
                    {item.id}
                  </td>
                  <td className="px-5 py-4 text-[var(--color-text-secondary)]">
                    {item.category}
                  </td>
                  <td className="px-5 py-4">
                    <span className={item.status === "Developed"
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text-muted)]"}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[var(--color-text-secondary)]">
                    {item.version ?? "—"}
                  </td>
                  <td className="px-5 py-4">
                    {item.docsAvailable ? (
                      <a
                        href={`/components/${item.id}`}
                        className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
                      >
                        View docs →
                      </a>
                    ) : (
                      <span className="text-[var(--color-text-muted)]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}