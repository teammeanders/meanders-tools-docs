"use client";

import { useLayoutEffect, useRef, useState } from "react";

type WireLayerProps = {
  componentId: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  inputCardRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  outputCardRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  nodeInputRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  nodeOutputRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  inputCount: number;
  outputCount: number;
};

type Point = {
  x: number;
  y: number;
};

type Wire = {
  id: string;
  path: string;
  reverse?: boolean;
};

function getPoint(
  element: HTMLSpanElement | null,
  containerRect: DOMRect,
  side: "left" | "right",
): Point | null {
  if (!element) return null;

  const rect = element.getBoundingClientRect();

  return {
    x: (side === "left" ? rect.left : rect.right) - containerRect.left,
    y: rect.top - containerRect.top + rect.height / 2,
  };
}

function makePath(start: Point, end: Point) {
  const distance = Math.abs(end.x - start.x);
  const curve = Math.max(30, distance * 0.45);

  return `M ${start.x} ${start.y}
    C ${start.x + curve} ${start.y},
      ${end.x - curve} ${end.y},
      ${end.x} ${end.y}`;
}

function AnimatedWire({
  path,
  reverse = false,
}: {
  path: string;
  reverse?: boolean;
}) {
  return (
    <>
      <path
        d={path}
        fill="none"
        stroke="#777"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <circle r="3" fill="#e5e5e5">
        <animateMotion
          dur="2.2s"
          begin={reverse ? "1.1s" : "0s"}
          repeatCount="indefinite"
          path={path}
        />
      </circle>

      <circle r="2" fill="#a3a3a3">
        <animateMotion
          dur="2.2s"
          begin={reverse ? "1.65s" : "0.55s"}
          repeatCount="indefinite"
          path={path}
        />
      </circle>
    </>
  );
}

export function WireLayer({
  componentId,
  containerRef,
  inputCardRefs,
  outputCardRefs,
  nodeInputRefs,
  nodeOutputRefs,
  inputCount,
  outputCount,
}: WireLayerProps) {
  const [wires, setWires] = useState<Wire[]>([]);
  const [size, setSize] = useState({
    width: 1,
    height: 1,
  });

  const measureTimer = useRef<number | null>(null);

  useLayoutEffect(() => {
    let cancelled = false;
    let frame = 0;

    const measure = () => {
      if (cancelled) return;

      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const container = containerRef.current;

        if (!container) {
          measure();
          return;
        }

        const rect = container.getBoundingClientRect();

        if (rect.width === 0 || rect.height === 0) {
          measure();
          return;
        }

        const nextWires: Wire[] = [];

        for (let index = 0; index < inputCount; index++) {
          const start = getPoint(inputCardRefs.current[index], rect, "right");

          const end = getPoint(nodeInputRefs.current[index], rect, "left");

          if (!start || !end) continue;

          nextWires.push({
            id: `${componentId}-input-${index}`,
            path: makePath(start, end),
          });
        }

        for (let index = 0; index < outputCount; index++) {
          const start = getPoint(nodeOutputRefs.current[index], rect, "right");

          const end = getPoint(outputCardRefs.current[index], rect, "left");

          if (!start || !end) continue;

          nextWires.push({
            id: `${componentId}-output-${index}`,
            path: makePath(start, end),
            reverse: true,
          });
        }

        if (cancelled) return;

        setSize({
          width: rect.width,
          height: rect.height,
        });

        setWires(nextWires);
      });
    };

    const observer = new ResizeObserver(measure);

    const observeElements = () => {
      const container = containerRef.current;

      if (container) {
        observer.observe(container);
      }

      [
        ...inputCardRefs.current,
        ...outputCardRefs.current,
        ...nodeInputRefs.current,
        ...nodeOutputRefs.current,
      ].forEach((element) => {
        if (element) {
          observer.observe(element);
        }
      });

      measure();
    };

    // Give React one frame to commit the new component DOM.
    frame = requestAnimationFrame(() => {
      observeElements();

      // Extra passes handle images, fonts and flex layout settling.
      window.setTimeout(measure, 30);
      window.setTimeout(measure, 120);
      window.setTimeout(measure, 300);
    });

    window.addEventListener("resize", measure);

    return () => {
      cancelled = true;

      cancelAnimationFrame(frame);

      if (measureTimer.current !== null) {
        window.clearTimeout(measureTimer.current);
      }

      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [
    componentId,
    inputCount,
    outputCount,
    containerRef,
    inputCardRefs,
    outputCardRefs,
    nodeInputRefs,
    nodeOutputRefs,
  ]);

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      viewBox={`0 0 ${size.width} ${size.height}`}
      preserveAspectRatio="none"
    >
      {wires.map((wire) => (
        <AnimatedWire key={wire.id} path={wire.path} reverse={wire.reverse} />
      ))}
    </svg>
  );
}
