import type { Metadata } from "next";
import Link from "next/link";
import {
  InfinityIcon,
  GraphIcon,
  DeviceMobileIcon,
  ChecklistIcon,
} from "@primer/octicons-react";
import "./globals.css";
import { RateBadge } from "@components/rate-badge";

export const metadata: Metadata = {
  title: "Matematica Vizuală Asistată",
  description: "Vizualizator de algoritmi cu urme și explicații",
  icons: {
    icon: "/site-icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body>
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="flex items-center gap-3 text-xl font-semibold text-sky-100">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/80 text-sky-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="currentColor">
                  <path d="M8.75 11a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Zm7.25.75a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 1.5 0v-3.5Z"></path>
                  <path d="M9.813 1h2.437a.75.75 0 0 1 .75.75V5h6.75A2.25 2.25 0 0 1 22 7.25v5.25h1.25a.75.75 0 0 1 0 1.5H22v5.75A2.25 2.25 0 0 1 19.75 22H4.25A2.25 2.25 0 0 1 2 19.75V14H.75a.75.75 0 0 1 0-1.5H2V7.25A2.25 2.25 0 0 1 4.25 5h7.25V2.5H9.813A.75.75 0 0 1 9.812 1ZM3.5 7.25v12.5c0 .414.336.75.75.75h15.5a.75.75 0 0 0 .75-.75V7.25a.75.75 0 0 0-.75-.75H4.25a.75.75 0 0 0-.75.75Z"></path>
                </svg>
              </span>
              <span className="leading-tight">
                Matematica Vizuală Asistată
                <span className="block text-sm font-normal text-slate-300">vizualizator interactiv de algoritmi</span>
              </span>
            </Link>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
              <nav className="flex flex-wrap items-center gap-3">
                <Link href="/" className="flex items-center gap-1 rounded-lg px-2 py-1 hover:bg-slate-800 hover:text-white">
                  <InfinityIcon size={16} />
                  Acasă
                </Link>
                <Link href="/algorithms" className="flex items-center gap-1 rounded-lg px-2 py-1 hover:bg-slate-800 hover:text-white">
                  <GraphIcon size={16} />
                  Catalog
                </Link>
              </nav>
              <RateBadge />
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
