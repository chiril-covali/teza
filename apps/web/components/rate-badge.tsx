"use client";

import useSWR from "swr";

import { api } from "@lib/api";

export function RateBadge() {
  // Refresh doar la 5 minute (nu la 1 minut) + dezactivează refresh la focus
  // Acest apel consumă din GitHub rate limit, așa că îl menținem minimal
  const { data, error } = useSWR("rate-limit", api.rateLimit, { 
    refreshInterval: 300_000, // 5 minute în loc de 1 minut
    revalidateOnFocus: false,  // Nu reîncărca când utilizatorul revine pe tab
    revalidateOnReconnect: false, // Nu reîncărca când se reconectează internetul
  });

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
