import "../styles/globals.css";
import type { ReactNode } from "react";
import Header from "@/components/Header";

export const metadata = {
  title: "FITTPLAN — персональный план тренировок",
  description: "Подбор персонального плана тренировок по короткому опросу"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-slate-100 text-slate-900">
        <Header />
        <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
      </body>
    </html>
  );
}