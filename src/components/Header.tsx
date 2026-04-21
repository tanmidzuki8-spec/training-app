"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const flag = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(flag);
  }, [pathname]);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-sky-600"
        >
          FITTPLAN
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/questionnaire"
            className="text-slate-700 hover:text-sky-600"
          >
            Опрос
          </Link>

          <Link
            href="/library"
            className="text-slate-700 hover:text-sky-600"
          >
            Библиотека упражнений
          </Link>

          {isLoggedIn && (
            <>
              <Link
                href="/plan"
                className="text-slate-700 hover:text-sky-600"
              >
                План
              </Link>
              <Link
                href="/progress"
                className="text-slate-700 hover:text-sky-600"
              >
                Прогресс
              </Link>
            </>
          )}

          {isLoggedIn ? (
            <Link
              href="/profile"
              className="px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-medium hover:bg-sky-500 transition"
            >
              Профиль
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-slate-700 hover:text-sky-600"
              >
                Войти
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-medium hover:bg-sky-500 transition"
              >
                Регистрация
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}