import type { Metadata } from "next";
import Link from "next/link";
import { GraphIcon } from "@primer/octicons-react";
import "./globals.css";

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
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 flex-1 w-full">
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
