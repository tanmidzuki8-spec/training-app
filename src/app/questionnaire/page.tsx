"use client";

import { useState } from "react";
import Link from "next/link";

type Level = "начинающий" | "средний" | "продвинутый";
type Goal = "похудение" | "набор массы" | "здоровье/тонус";
type Days = "2-3" | "4-5" | "6-7";

export default function QuestionnairePage() {
  const [level, setLevel] = useState<Level | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [days, setDays] = useState<Days | null>(null);

  const answeredCount =
    (level ? 1 : 0) + (goal ? 1 : 0) + (days ? 1 : 0);
  const progress = Math.round((answeredCount / 3) * 100);
  const canContinue = answeredCount === 3;

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!canContinue) return;

  if (typeof window !== "undefined") {
    localStorage.setItem("q_goal", goal || "");
    localStorage.setItem("q_level", level || "");
    localStorage.setItem("q_days", days || "");
  }

  window.location.href = "/questionnaire/health";
};

  return (
    <div className="max-w-3xl mx-auto">
      {/* Назад на главную */}
      <div className="mb-4 text-sm">
        <Link href="/" className="text-sky-600 hover:text-sky-500">
          ← На главную
        </Link>
      </div>

      <div className="relative">
        {/* Голубые круги фоном */}
        <div className="pointer-events-none absolute -right-24 -top-20 h-40 w-40 rounded-full bg-sky-100 opacity-70" />
        <div className="pointer-events-none absolute -left-28 bottom-[-60px] h-44 w-44 rounded-full bg-sky-100 opacity-70" />

        {/* Карточка опроса */}
        <div className="relative rounded-3xl bg-white border border-slate-200 px-10 py-10 shadow-[0_20px_60px_rgba(15,23,42,0.12)] space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-1">
                Ответь на 3 вопроса
              </h1>
              <p className="text-xs md:text-sm text-slate-500">
                Подберём идеальную неделю тренировок под твой уровень.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-sky-500 px-3 py-1 text-xs font-semibold text-white">
              30 секунд
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ВОПРОС 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                  1
                </span>
                <p className="text-sm md:text-base font-medium text-slate-900">
                  Твой текущий уровень?
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { value: "начинающий", label: "Начинающий" },
                  { value: "средний", label: "Средний" },
                  { value: "продвинутый", label: "Продвинутый" }
                ].map((opt) => {
                  const active = level === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setLevel(opt.value as Level)}
                      className={
                        "rounded-full border px-5 py-2 text-sm transition " +
                        (active
                          ? "border-sky-500 bg-sky-50 text-sky-700 shadow-sm"
                          : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50")
                      }
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ВОПРОС 2 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                  2
                </span>
                <p className="text-sm md:text-base font-medium text-slate-900">
                  Основная цель?
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { value: "похудение", label: "Похудение" },
                  { value: "набор массы", label: "Набор массы" },
                  { value: "здоровье/тонус", label: "Здоровье/тонус" }
                ].map((opt) => {
                  const active = goal === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setGoal(opt.value as Goal)}
                      className={
                        "rounded-full border px-5 py-2 text-sm transition " +
                        (active
                          ? "border-sky-500 bg-sky-50 text-sky-700 shadow-sm"
                          : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50")
                      }
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ВОПРОС 3 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                  3
                </span>
                <p className="text-sm md:text-base font-medium text-slate-900">
                  Сколько дней в неделю готов(а) заниматься?
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { value: "2-3", label: "2–3 дня" },
                  { value: "4-5", label: "4–5 дней" },
                  { value: "6-7", label: "6–7 дней" }
                ].map((opt) => {
                  const active = days === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setDays(opt.value as Days)}
                      className={
                        "rounded-full border px-5 py-2 text-sm transition " +
                        (active
                          ? "border-sky-500 bg-sky-50 text-sky-700 shadow-sm"
                          : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50")
                      }
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Нижняя панель */}
            <div className="mt-4 border-t border-slate-200 pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span>Выбрано {answeredCount}/3</span>
                <span className="hidden md:inline">•</span>
                <span>Готовность {progress}%</span>
              </div>

              {canContinue ? (
                <button
                  type="submit"
                  className="mt-1 w-full md:w-40 rounded-full px-6 py-2.5 text-sm font-semibold bg-sky-600 text-white text-center hover:bg-sky-500 transition"
                >
                  Далее
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-1 w-full md:w-40 rounded-full px-6 py-2.5 text-sm font-semibold bg-slate-300 text-slate-500 cursor-not-allowed"
                >
                  Далее
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Подпись */}
      <div className="mt-8 text-center text-[11px] text-slate-500">
        <span className="font-semibold text-sky-600">FITTPLAN</span>{" "}
        Персональный план за 30 секунд
      </div>
    </div>
  );
}
