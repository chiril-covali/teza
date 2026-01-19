"use client";

import useSWR from "swr";

import { api } from "@lib/api";

export function RateBadge() {
  const { data, error } = useSWR("rate-limit", api.rateLimit, { refreshInterval: 60_000 });

  if (error) {
    return <span className="text-xs text-amber-300">Limită: eroare</span>;
  }

  if (!data) {
    return (
      <span className="inline-flex h-6 min-w-[120px] items-center justify-center rounded-full bg-slate-800/60 text-xs text-slate-400 backdrop-blur">
        Se încarcă…
      </span>
    );
  }

  if (data.error) {
    return <span className="text-xs text-amber-300">Limită: {data.error}</span>;
  }

  const remaining = data.remaining ?? "-";
  const limit = data.limit ?? "-";
  return (
    <span className="text-xs rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-slate-200">
      GitHub free-tier: {remaining}/{limit} azi
    </span>
  );
}
