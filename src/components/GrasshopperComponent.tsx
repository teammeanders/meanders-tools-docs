import type { MeandersComponent } from "@/types/meanders";

type Props = {
  component: MeandersComponent;
};

const ICON_BASE =
  "https://raw.githubusercontent.com/teammeanders/Meanders.Tools/master/assets/icons/";

function Wire({ path }: { path: string }) {
  return (
    <>
      <path d={path} fill="none" stroke="#777" strokeWidth="1.5" />

      <circle r="2.5" fill="#d4d4d4">
        <animateMotion dur="2.4s" repeatCount="indefinite" path={path} />
      </circle>

      <circle r="2" fill="#999" opacity="0.7">
        <animateMotion
          dur="2.4s"
          begin="0.8s"
          repeatCount="indefinite"
          path={path}
        />
      </circle>
    </>
  );
}

export function GrasshopperComponent({ component }: Props) {
  const inputCount = component.inputs.length;
  const outputCount = component.outputs.length;

  const rows = Math.max(inputCount, outputCount, 1);

  const rowHeight = 72;
  const nodeHeight = Math.max(150, rows * rowHeight + 70);

  const width = 900;

  const inputX = 285;
  const nodeLeft = 365;
  const nodeRight = 535;
  const outputX = 615;

  const nodeCenterY = nodeHeight / 2;

  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-[#242424] p-8 shadow-2xl">
      <div
        className="relative mx-auto"
        style={{
          width,
          height: nodeHeight,
        }}
      >
        {/* Wires */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${width} ${nodeHeight}`}
          fill="none"
        >
          {component.inputs.map((input, index) => {
            const y = 45 + index * rowHeight;

            const path = `
              M ${inputX} ${y}
              C ${inputX + 45} ${y},
                ${nodeLeft - 45} ${nodeCenterY},
                ${nodeLeft} ${nodeCenterY}
            `;

            return <Wire key={`input-wire-${input.name}`} path={path} />;
          })}

          {component.outputs.map((output, index) => {
            const y = 45 + index * rowHeight;

            const path = `
              M ${nodeRight} ${nodeCenterY}
              C ${nodeRight + 45} ${nodeCenterY},
                ${outputX - 45} ${y},
                ${outputX} ${y}
            `;

            return <Wire key={`output-wire-${output.name}`} path={path} />;
          })}
        </svg>

        {/* Inputs */}
        <div className="absolute left-0 top-0 w-[285px]">
          <div className="space-y-[16px]">
            {component.inputs.map((input) => (
              <div
                key={input.name}
                className="relative h-14 rounded-md border border-neutral-600 bg-[#303030] px-3 py-2 text-white shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{input.name}</span>

                  <span className="rounded bg-neutral-600 px-1.5 py-0.5 text-[10px] text-neutral-200">
                    {input.access}
                  </span>

                  {input.optional && (
                    <span className="text-[10px] text-neutral-500">
                      optional
                    </span>
                  )}
                </div>

                <div className="mt-1 text-xs text-neutral-400">
                  {input.nickname} · {input.type}
                </div>

                <p className="mt-1 text-[11px] leading-tight text-neutral-400">
                  {input.description}
                </p>

                <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-neutral-400 bg-[#242424]" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Node */}
        <div
          className="absolute left-[365px] top-1/2 w-[170px] -translate-y-1/2 overflow-hidden rounded-md border border-neutral-500 bg-[#303030] shadow-xl"
          style={{
            height: Math.min(nodeHeight - 20, 220),
          }}
        >
          <div className="relative flex h-full flex-col">
            {/* Icon */}
            <div className="flex flex-1 items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-md bg-[#1f1f1f]">
                <img
                  src={`${ICON_BASE}${component.icon}`}
                  alt={component.name}
                  className="h-11 w-11 object-contain"
                />
              </div>
            </div>

            {/* Vertical Name */}
            <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 items-center justify-center">
              <span
                className="select-none text-sm font-semibold tracking-wide text-white"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {component.name}
              </span>
            </div>

            {/* Nickname */}
            <div className="border-t border-neutral-600 px-3 py-2 text-center text-xs text-neutral-300">
              {component.nickname}
            </div>
          </div>

          {/* Input connection points */}
          {component.inputs.map((input, index) => {
            const relativeY = 45 + index * rowHeight - nodeCenterY;

            return (
              <span
                key={`node-input-${input.name}`}
                className="absolute -left-1.5 h-3 w-3 rounded-full border border-neutral-400 bg-[#242424]"
                style={{
                  top: `calc(50% + ${relativeY}px)`,
                }}
              />
            );
          })}

          {/* Output connection points */}
          {component.outputs.map((output, index) => {
            const relativeY = 45 + index * rowHeight - nodeCenterY;

            return (
              <span
                key={`node-output-${output.name}`}
                className="absolute -right-1.5 h-3 w-3 rounded-full border border-neutral-400 bg-[#242424]"
                style={{
                  top: `calc(50% + ${relativeY}px)`,
                }}
              />
            );
          })}
        </div>

        {/* Outputs */}
        <div className="absolute right-0 top-0 w-[285px]">
          <div className="space-y-[16px]">
            {component.outputs.map((output) => (
              <div
                key={output.name}
                className="relative h-14 rounded-md border border-neutral-600 bg-[#303030] px-3 py-2 text-white shadow-sm"
              >
                <div className="flex items-center justify-end gap-2">
                  <span className="rounded bg-neutral-600 px-1.5 py-0.5 text-[10px] text-neutral-200">
                    {output.access}
                  </span>

                  <span className="font-semibold text-sm">{output.name}</span>
                </div>

                <div className="mt-1 text-right text-xs text-neutral-400">
                  {output.nickname} · {output.type}
                </div>

                <p className="mt-1 text-right text-[11px] leading-tight text-neutral-400">
                  {output.description}
                </p>

                <span className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-neutral-400 bg-[#242424]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
