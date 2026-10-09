import fs from "fs/promises";
import path from "path";
import type { ReactNode } from "react";
import { getRoadmapWithComponents } from "@/lib/meanders-data";
import { ComponentRegistryTable } from "@/components/ComponentRegistryTable";

function renderLines(markdown: string): ReactNode[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");

  const output: ReactNode[] = [];

  let list: string[] = [];
  let ordered: string[] = [];
  let code: string[] | null = null;

  const flush = () => {
    if (list.length) {
      output.push(
        <ul
          key={"ul-" + output.length}
          className="mt-4 space-y-2 pl-6 text-body-small text-[var(--color-text-secondary)]"
        >
          {list.map((item, index) => (
            <li key={index} className="list-disc pl-1">
              {item}
            </li>
          ))}
        </ul>,
      );

      list = [];
    }

    if (ordered.length) {
      output.push(
        <ol
          key={"ol-" + output.length}
          className="mt-4 space-y-2 pl-6 text-body-small text-[var(--color-text-secondary)]"
        >
          {ordered.map((item, index) => (
            <li key={index} className="list-decimal pl-1">
              {item}
            </li>
          ))}
        </ol>,
      );

      ordered = [];
    }
  };

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];

    /*
     * Code block
     */
    if (line.startsWith("~~~")) {
      flush();

      if (code === null) {
        code = [];
      } else {
        output.push(
          <pre
            key={"code-" + output.length}
            className="mt-5 overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[#0a0c0e] p-5 text-sm leading-6 text-[var(--color-text-secondary)]"
          >
            <code>{code.join("\n")}</code>
          </pre>,
        );

        code = null;
      }

      continue;
    }

    if (code !== null) {
      code.push(line);
      continue;
    }

    /*
     * Empty line
     */
    if (!line.trim()) {
      flush();
      continue;
    }

    /*
     * H1
     */
    if (line.startsWith("# ")) {
      flush();

      output.push(
        <h1 key={"h1-" + output.length} className="text-page-title">
          {line.slice(2)}
        </h1>,
      );

      continue;
    }

    /*
     * H2
     */
    if (line.startsWith("## ")) {
      flush();

      output.push(
        <h2
          key={"h2-" + output.length}
          className="mt-16 border-t border-[var(--color-border)] pt-10 text-page-heading"
        >
          {line.slice(3)}
        </h2>,
      );

      continue;
    }

    /*
     * H3
     */
    if (line.startsWith("### ")) {
      flush();

      output.push(
        <h3 key={"h3-" + output.length} className="mt-8 text-section-heading">
          {line.slice(4)}
        </h3>,
      );

      continue;
    }

    /*
     * Unordered list
     */
    if (line.startsWith("- ")) {
      if (ordered.length) {
        flush();
      }

      list.push(line.slice(2));
      continue;
    }

    /*
     * Ordered list
     */
    if (/^\d+\. /.test(line)) {
      if (list.length) {
        flush();
      }

      ordered.push(line.replace(/^\d+\. /, ""));

      continue;
    }

    /*
     * Paragraph
     */
    flush();

    output.push(
      <p
        key={"p-" + output.length}
        className="mt-5 max-w-4xl text-body text-[var(--color-text-secondary)]"
      >
        {line}
      </p>,
    );
  }

  flush();

  return output;
}

export default async function DevelopersPage() {
  const filePath = path.join(process.cwd(), "docs", "developers.md");

  const markdown = await fs.readFile(filePath, "utf8");

  const [content, roadmap] = await Promise.all([
    Promise.resolve(renderLines(markdown)),
    getRoadmapWithComponents(),
  ]);

  return (
    <article className="mx-auto w-full max-w-[var(--content-max-width)] px-6 py-12 lg:px-10 lg:py-16">
      <header className="max-w-4xl border-b border-[var(--color-border)] pb-12">
        <div className="text-label text-[var(--color-accent)]">Development</div>

        <div className="mt-4">{content[0]}</div>

        <p className="mt-5 max-w-3xl text-body text-[var(--color-text-secondary)]">
          Everything needed to build, test, document, and ship a Meanders.Tools
          component.
        </p>
      </header>

      <div className="max-w-4xl">{content.slice(1)}</div>
    </article>
  );
}
