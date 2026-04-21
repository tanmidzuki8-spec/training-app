"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const name = localStorage.getItem("userName");
    setUserName(name);
  }, []);

  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.setItem("isLoggedIn", "false");
    }
    router.push("/");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="rounded-3xl bg-white border border-slate-200 px-6 md:px-10 py-8 md:py-10 shadow-[0_20px_60px_rgba(15,23,42,0.12)] space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-1">
              {userName ? `Привет, ${userName}` : "Ваш профиль"}
            </h1>
            <p className="text-xs md:text-sm text-slate-500">
              Перейдите к плану тренировок или посмотрите прогресс.
            </p>
          </div>

          {/* КНОПКА ВЫЙТИ */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-xs md:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Выйти
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Link
            href="/plan"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 hover:bg-sky-50 hover:border-sky-200 transition"
          >
            <p className="text-sm font-semibold text-slate-900 mb-1">
              План тренировок
            </p>
            <p className="text-xs text-slate-500">
              Посмотрите свой план на неделю и выберите тренировку.
            </p>
          </Link>

          <Link
            href="/progress"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 hover:bg-sky-50 hover:border-sky-200 transition"
          >
            <p className="text-sm font-semibold text-slate-900 mb-1">
              Прогресс
            </p>
            <p className="text-xs text-slate-500">
              Отслеживайте количество тренировок и динамику.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}