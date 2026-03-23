"use client";

import dynamic from "next/dynamic";

const LandingAlgorithmShowcase = dynamic(() => import("./LandingAlgorithmShowcase"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-500">
      Se incarca demonstratia interactiva...
    </div>
  ),
});

export default function LandingAlgorithmShowcaseNoSSR() {
  return <LandingAlgorithmShowcase />;
}
