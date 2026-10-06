import type { Port } from "@/types/meanders";

type Props = {
  title: string;
  ports: Port[];
};

export function PortList({ title, ports }: Props) {
  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-label text-[var(--color-text-muted)]">
            {title === "Inputs" ? "Input Parameters" : "Output Parameters"}
          </div>

          <h2 className="text-page-heading mt-2">{title}</h2>
        </div>

        <div className="text-caption">
          {ports.length} {ports.length === 1 ? "parameter" : "parameters"}
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-[var(--color-border)]">
        {ports.map((port, index) => (
          <div
            key={port.name}
            className={`bg-[var(--color-surface)] p-5 ${
              index !== ports.length - 1
                ? "border-b border-[var(--color-border)]"
                : ""
            }`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-[var(--color-text)]">
                    {port.name}
                  </h3>

                  <code className="rounded bg-[var(--color-surface-elevated)] px-1.5 py-0.5 text-xs text-[var(--color-accent-light)]">
                    {port.nickname}
                  </code>

                  {port.optional && (
                    <span className="rounded border border-[var(--color-border)] px-1.5 py-0.5 text-xs text-[var(--color-text-muted)]">
                      optional
                    </span>
                  )}
                </div>

                <p className="mt-2 max-w-2xl text-body-small text-[var(--color-text-secondary)]">
                  {port.description}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2 text-xs">
                <span className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-2 py-1 text-[var(--color-text-secondary)]">
                  {port.type}
                </span>

                <span className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-2 py-1 text-[var(--color-text-secondary)]">
                  {port.access}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
