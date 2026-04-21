"use client";

import { useState } from "react";
import Link from "next/link";

type ProblemKey = "spine" | "joints" | "heart" | "asthma" | "other";
type InjuryKey = "none" | "longAgo" | "recent";
type LimitKey =
  | "heavy"
  | "runJump"
  | "jointsCore"
  | "spineLimit"
  | "noLimits";

export default function HealthQuestionnairePage() {
  const [problems, setProblems] = useState<ProblemKey[]>([]);
  const [injury, setInjury] = useState<InjuryKey | null>(null);
  const [limits, setLimits] = useState<LimitKey[]>([]);

  const toggleProblem = (val: ProblemKey) => {
    setProblems((prev) =>
      prev.includes(val) ? prev.filter((p) => p !== val) : [...prev, val]
    );
  };

  const toggleLimit = (val: LimitKey) => {
    if (val === "noLimits") {
      setLimits((prev) => (prev.includes("noLimits") ? [] : ["noLimits"]));
      return;
    }
    setLimits((prev) => {
      const without = prev.filter((p) => p !== "noLimits");
      return without.includes(val)
        ? without.filter((p) => p !== val)
        : [...without, val];
    });
  };

  const answeredCount =
    (problems.length ? 1 : 0) + (injury ? 1 : 0) + (limits.length ? 1 : 0);
  const progress = Math.round((answeredCount / 3) * 100);
  const canContinue = answeredCount === 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canContinue) return;

    if (typeof window !== "undefined") {
      localStorage.setItem("q_problems", JSON.stringify(problems));
      localStorage.setItem("q_injury", injury || "");
      localStorage.setItem("q_limits", JSON.stringify(limits));
    }

    window.location.href = "/plan";
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Назад к предыдущим */}
      <div className="mb-4 text-sm">
        <Link href="/questionnaire" className="text-sky-600 hover:text-sky-500">
          ← К предыдущим вопросам
        </Link>
      </div>

      <div className="relative">
        {/* Голубые круги фоном */}
        <div className="pointer-events-none absolute -right-24 -top-20 h-40 w-40 rounded-full bg-sky-100 opacity-70" />
        <div className="pointer-events-none absolute -left-28 bottom-[-60px] h-44 w-44 rounded-full bg-sky-100 opacity-70" />

        {/* Карточка шага 2 */}
        <div className="relative rounded-3xl bg-white border border-slate-200 px-10 py-10 shadow-[0_20px_60px_rgba(15,23,42,0.12)] space-y-6">
          {/* Верх */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-1">
                Ещё 3 вопроса о здоровье
              </h1>
              <p className="text-xs md:text-sm text-slate-500">
                Чтобы тренировки были не только эффективными, но и безопасными.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-[11px] font-semibold text-blue-700">
              Важно
            </span>
          </div>

          {/* Блок конфиденциальности */}
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50 px-5 py-4">
            <p className="text-sm font-semibold text-emerald-700 mb-1">
              Всё анонимно и конфиденциально
            </p>
            <p className="text-xs text-emerald-800">
              Эти данные нужны только чтобы подобрать безопасную программу.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ВОПРОС 4 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                  4
                </span>
                <p className="text-sm md:text-base font-medium text-slate-900">
                  Есть ли проблемы со здоровьем?
                </p>
              </div>
              <p className="text-xs text-slate-500">
                Выберите всё, что актуально.
              </p>

              <div className="grid gap-2 md:grid-cols-2 text-sm">
                {[
                  {
                    key: "spine" as ProblemKey,
                    label: "Проблемы со спиной / позвоночником"
                  },
                  {
                    key: "joints" as ProblemKey,
                    label: "Проблемы с суставами (колени, локти)"
                  },
                  {
                    key: "heart" as ProblemKey,
                    label: "Сердечно‑сосудистые заболевания"
                  },
                  {
                    key: "asthma" as ProblemKey,
                    label: "Астма / проблемы с дыханием"
                  },
                  {
                    key: "other" as ProblemKey,
                    label: "Есть другие проблемы"
                  }
                ].map((opt) => (
                  <label
                    key={opt.key}
                    className="inline-flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                      checked={problems.includes(opt.key)}
                      onChange={() => toggleProblem(opt.key)}
                    />
                    <span className="text-slate-800">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* ВОПРОС 5 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                  5
                </span>
                <p className="text-sm md:text-base font-medium text-slate-900">
                  Были ли серьёзные травмы в прошлом?
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { key: "none" as InjuryKey, label: "Нет" },
                  { key: "longAgo" as InjuryKey, label: "Да, но давно" },
                  { key: "recent" as InjuryKey, label: "Да, недавно" }
                ].map((opt) => {
                  const active = injury === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setInjury(opt.key)}
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

            {/* ВОПРОС 6 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                  6
                </span>
                <p className="text-sm md:text-base font-medium text-slate-900">
                  Есть ли ограничения по упражнениям?
                </p>
              </div>
              <p className="text-xs text-slate-500">
                Что нельзя делать категорически?
              </p>

              <div className="grid gap-2 md:grid-cols-2 text-sm">
                {[
                  { key: "heavy" as LimitKey, label: "Тяжёлые веса" },
                  { key: "runJump" as LimitKey, label: "Бег / прыжки" },
                  {
                    key: "jointsCore" as LimitKey,
                    label: "Суставы / упражнения на пресс"
                  },
                  {
                    key: "spineLimit" as LimitKey,
                    label: "Повороты / наклоны спиной"
                  },
                  { key: "noLimits" as LimitKey, label: "Нет ограничений" }
                ].map((opt) => (
                  <label
                    key={opt.key}
                    className="inline-flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                      checked={limits.includes(opt.key)}
                      onChange={() => toggleLimit(opt.key)}
                    />
                    <span className="text-slate-800">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Нижняя панель */}
            <div className="mt-4 border-t border-slate-200 pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span>Выбрано {answeredCount}/3</span>
                <span className="hidden md:inline">•</span>
                <span>Готовность {progress}%</span>
              </div>

              <button
                type="submit"
                disabled={!canContinue}
                className={
                  "mt-1 w-full md:w-56 rounded-full px-6 py-2.5 text-sm font-semibold transition " +
                  (canContinue
                    ? "bg-sky-600 text-white hover:bg-sky-500"
                    : "bg-slate-300 text-slate-500 cursor-not-allowed")
                }
              >
                Получить персональный план
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* подпись */}
      <div className="mt-8 text-center text-[11px] text-slate-500">
        Безопасность превыше всего · Индивидуальный подход
      </div>
    </div>
  );
}