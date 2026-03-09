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
        <div className="min-h-screen flex flex-col">
          <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8 flex-1 w-full">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/" className="flex items-center gap-3 text-lg sm:text-xl font-semibold text-slate-900">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-white flex-shrink-0 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="currentColor">
                    <path d="M8.75 11a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75Zm7.25.75a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 1.5 0v-3.5Z"></path>
                    <path d="M9.813 1h2.437a.75.75 0 0 1 .75.75V5h6.75A2.25 2.25 0 0 1 22 7.25v5.25h1.25a.75.75 0 0 1 0 1.5H22v5.75A2.25 2.25 0 0 1 19.75 22H4.25A2.25 2.25 0 0 1 2 19.75V14H.75a.75.75 0 0 1 0-1.5H2V7.25A2.25 2.25 0 0 1 4.25 5h7.25V2.5H9.813A.75.75 0 0 1 9.812 1ZM3.5 7.25v12.5c0 .414.336.75.75.75h15.5a.75.75 0 0 0 .75-.75V7.25a.75.75 0 0 0-.75-.75H4.25a.75.75 0 0 0-.75.75Z"></path>
                  </svg>
                </span>
                <span className="leading-tight">
                  <span className="block">Matematica Vizuală Asistată</span>
                  <span className="block text-xs sm:text-sm font-normal text-slate-600">vizualizator interactiv de algoritmi</span>
                </span>
              </Link>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-slate-700">
                <nav className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <Link href="/" className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 hover:bg-white hover:text-sky-600 hover:shadow-sm transition-all">
                    <InfinityIcon size={16} />
                    <span className="hidden sm:inline">Acasă</span>
                  </Link>
                  <Link href="/algorithms" className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 hover:bg-white hover:text-sky-600 hover:shadow-sm transition-all">
                    <GraphIcon size={16} />
                    <span>Algoritmi</span>
                  </Link>
                </nav>
                <RateBadge />
              </div>
            </header>
            {children}
          </div>
          
          <footer className="mt-auto border-t border-slate-200 bg-white">
            <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-slate-900">Despre Proiect</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Platformă educațională pentru învățarea algoritmilor fundamentali prin vizualizări interactive și asistență AI.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-slate-900">Linkuri Rapide</h3>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li>
                      <Link href="/" className="hover:text-sky-600 transition-colors">Acasă</Link>
                    </li>
                    <li>
                      <Link href="/algorithms" className="hover:text-sky-600 transition-colors">Catalog Algoritmi</Link>
                    </li>
                    <li>
                      <a href="https://github.com/chiril-covali/teza" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 transition-colors flex items-center gap-1">
                        <GraphIcon size={12} />
                        GitHub Repository
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-slate-900">Tehnologii</h3>
                  <ul className="space-y-1 text-xs text-slate-600">
                    <li>• Next.js 15 & React 19</li>
                    <li>• FastAPI Python Backend</li>
                    <li>• GitHub Models AI</li>
                    <li>• Tailwind CSS</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-200 text-center text-xs text-slate-500">
                <p>© 2026 Matematica Vizuală Asistată · Proiect de Teză</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
