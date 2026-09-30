import type { Port } from "@/types/meanders";

type Props = {
  title: string;
  ports: Port[];
};

export function PortList({ title, ports }: Props) {
  return (
    <section>
      <h2 className="text-2xl font-semibold">{title}</h2>

      <div className="mt-5 space-y-4">
        {ports.map((port) => (
          <div
            key={port.name}
            className="rounded-lg border border-neutral-200 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">{port.name}</span>

                <span className="ml-2 text-sm text-neutral-400">
                  {port.nickname}
                </span>
              </div>

              <div className="text-xs text-neutral-500">
                {port.type} · {port.access}
              </div>
            </div>

            <p className="mt-2 text-sm text-neutral-600">{port.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
