import type { Metadata } from "next";
import { Space_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";

const titluFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-titlu",
  weight: ["500", "700"],
});

const corpFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-corp",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Matematica Vizuală Asistată",
  description: "Învață algoritmi prin vizualizare interactivă și asistent IA",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className={`${titluFont.variable} ${corpFont.variable} bg-slate-50`}>
        <div className="mx-auto max-w-7xl px-4 py-8">{children}</div>
      </body>
    </html>
  );
}
