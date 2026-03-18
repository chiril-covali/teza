import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matematica Vizuală Asistată",
  description: "Învață algoritmi prin vizualizare interactivă și AI ajutor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-8">{children}</div>
      </body>
    </html>
  );
}
