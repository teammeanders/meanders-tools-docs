"use client";
import { useRef } from "react";
import type { MeandersComponent } from "@/types/meanders";
import { WireLayer } from "@/components/WireLayer";

type Props = {
  component: MeandersComponent;
};

const ICON_BASE =
  "https://raw.githubusercontent.com/teammeanders/Meanders.Tools/master/assets/icons/";

const HEADER_HEIGHT = 44;
const FOOTER_HEIGHT = 40;
const PORT_ROW_HEIGHT = 40;
const BODY_PADDING = 8;
const TOP_PADDING = 50;
const BOTTOM_PADDING = 50;

function ConnectionPoint({
  side,
  pointRef,
}: {
  side: "left" | "right";
  pointRef: (element: HTMLSpanElement | null) => void;
}) {
  return (
    <span
      ref={pointRef}
      className={[
        "absolute top-1/2 h-3 w-3 -translate-y-1/2",
        "rounded-full border border-neutral-300 bg-[#202020]",
        side === "left" ? "-right-1.5" : "-left-1.5",
      ].join(" ")}
    />
  );
}

export function GrasshopperComponent({ component }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const inputCardRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const outputCardRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const nodeInputRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const nodeOutputRefs = useRef<(HTMLSpanElement | null)[]>([]);

  return (
    <div className="hidden w-full min-w-0 overflow-hidden rounded-2xl border border-neutral-800 bg-[#202020] p-4 sm:p-6 xl:block">
      <div
        ref={containerRef}
        className="relative flex w-full min-w-0 items-center justify-between"
      >
        <WireLayer
          componentId={component.id}
          containerRef={containerRef}
          inputCardRefs={inputCardRefs}
          outputCardRefs={outputCardRefs}
          nodeInputRefs={nodeInputRefs}
          nodeOutputRefs={nodeOutputRefs}
          inputCount={component.inputs.length}
          outputCount={component.outputs.length}
        />

        {/* INPUT DOCUMENTATION */}
        <div
          className="left-0 top-0 z-10 h-full"
          style={{
            width: "29%",
          }}
        >
          <div className="flex h-full flex-col justify-between gap-2">
            {component.inputs.map((input, index) => (
              <div
                key={input.name}
                className="relative rounded-md border border-neutral-600 bg-[#303030] px-3 py-2 text-white shadow-sm"
              >
                <ConnectionPoint
                  side="left"
                  pointRef={(element) => {
                    inputCardRefs.current[index] = element;
                  }}
                />

                <div className="flex min-w-0 items-center gap-2">
                  <span className="truncate text-sm font-semibold">
                    {input.name}
                  </span>

                  {input.optional && (
                    <span className="shrink-0 text-[10px] text-neutral-500">
                      optional
                    </span>
                  )}
                </div>

                <div className="mt-1 truncate text-xs text-neutral-400">
                  {input.nickname} · {input.type} · {input.access}
                </div>

                <p className="mt-1 line-clamp-2 text-[11px] leading-tight text-neutral-400">
                  {input.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* GRASSHOPPER NODE */}
        <div className="z-20 overflow-visible rounded-2xl border border-neutral-500 bg-[#353535] shadow-xl">
          {/* Header */}
          <div
            className="flex items-center justify-center rounded-t-2xl border-b border-neutral-500 bg-[#414141] px-2"
            style={{ height: HEADER_HEIGHT }}
          >
            <span className="truncate text-xs font-semibold text-neutral-200">
              {component.nickname}
            </span>
          </div>

          {/* Body */}
          <div className="relative flex items-center gap-3">
            <div>
              {component.inputs.map((input, index) => (
                <div
                  key={`node-input-${input.name}`}
                  className="relative px-4 py-2 bg"
                >
                  <ConnectionPoint
                    side="right"
                    pointRef={(element) => {
                      nodeInputRefs.current[index] = element;
                    }}
                  />

                  <span className="pl-3 text-sm font-semibold text-neutral-200">
                    {input.nickname}
                  </span>
                </div>
              ))}
            </div>

            {/* Center icon */}
            <div className="pointer-events-none my-4 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#242424]">
                <img
                  src={`${ICON_BASE}${component.icon}`}
                  alt={component.name}
                  className="h-12 w-12 object-contain"
                />
              </div>
            </div>

            <div>
              {component.outputs.map((output, index) => (
                <div
                  key={`node-output-${output.name}`}
                  className="relative px-4 py-2"
                >
                  <ConnectionPoint
                    side="left"
                    pointRef={(element) => {
                      nodeOutputRefs.current[index] = element;
                    }}
                  />

                  <span className="pr-3 text-sm font-semibold text-neutral-200">
                    {output.nickname}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-center rounded-b-2xl border-t border-neutral-500 bg-[#303030] px-2"
            style={{ height: FOOTER_HEIGHT }}
          >
            <span className="truncate text-xs font-semibold text-white">
              {component.name}
            </span>
          </div>
        </div>

        {/* OUTPUT DOCUMENTATION */}
        <div
          className="right-0 top-0 z-10"
          style={{
            width: "29%",
          }}
        >
          <div className="flex flex-col gap-2">
            {component.outputs.map((output, index) => (
              <div
                key={output.name}
                className="relative rounded-md border border-neutral-600 bg-[#303030] px-3 py-2 text-white shadow-sm"
              >
                <ConnectionPoint
                  side="right"
                  pointRef={(element) => {
                    outputCardRefs.current[index] = element;
                  }}
                />

                <div className="truncate text-sm font-semibold">
                  {output.name}
                </div>

                <div className="mt-1 truncate text-xs text-neutral-400">
                  {output.nickname} · {output.type} · {output.access}
                </div>

                <p className="mt-1 line-clamp-2 text-[11px] leading-tight text-neutral-400">
                  {output.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
