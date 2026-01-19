"use client";

import clsx from "clsx";
import { TraceEvent } from "@lib/trace";

export function ArrayVisualizer({
  array,
  event,
}: {
  array: number[];
  event?: TraceEvent;
}) {
  const highlight = new Set<number>();
  if (event?.type === "compare" || event?.type === "swap") {
    highlight.add(event.indices[0]);
    highlight.add(event.indices[1]);
  } else if (event?.type === "set") {
    highlight.add(event.index);
  }

  const max = Math.max(1, ...array.map((n) => Math.abs(n)));

  return (
    <div className="flex items-end gap-1 h-56 w-full rounded-lg border border-slate-800 bg-slate-900 p-3">
      {array.map((value, idx) => {
        const height = Math.max(20, Math.round((Math.abs(value) / max) * 150));
        return (
          <div key={idx} className="relative flex-1 min-w-[16px]">
            <div className="absolute -top-6 w-full text-center text-[11px] text-slate-200">
              {value}
            </div>
            <div
              className={clsx(
                "rounded-t-md bg-sky-500 transition-all duration-200",
                highlight.has(idx) && "bg-amber-400 shadow-lg shadow-amber-500/40"
              )}
              style={{ height }}
              title={`index ${idx}: ${value}`}
            />
            <div className="mt-1 text-center text-[10px] text-slate-500">{idx}</div>
          </div>
        );
      })}
    </div>
  );
}
