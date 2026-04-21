"use client";

import { useEffect, useState } from "react";
import type { Plan, Workout, Exercise } from "@prisma/client";

type FullPlan = Plan & {
  workouts: (Workout & { exercises: Exercise[] })[];
};

type Props = {
  plans: FullPlan[];
};

type DayState = {
  index: number;
};

type HealthState = {
  problems: string[];
  injury: string | null;
  limits: string[];
};

export default function PlanClient({ plans }: Props) {
  const [selectedPlan, setSelectedPlan] = useState<FullPlan | null>(null);
  const [state, setState] = useState<DayState>({ index: 0 });
  const [health, setHealth] = useState<HealthState>({
    problems: [],
    injury: null,
    limits: []
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const goal = localStorage.getItem("q_goal") || "";
    const level = localStorage.getItem("q_level") || "";
    const days = localStorage.getItem("q_days") || "";

    let daysPerWeek: number | null = null;
    if (days === "2-3") daysPerWeek = 3;
    if (days === "4-5") daysPerWeek = 5;
    if (days === "6-7") daysPerWeek = 6;

    let best: FullPlan | undefined;

    if (daysPerWeek !== null) {
      best = plans.find(
        (p) =>
          p.goal === goal &&
          p.level === level &&
          p.daysPerWeek === daysPerWeek
      );
    }

    if (!best) {
      best = plans.find((p) => p.goal === goal && p.level === level);
    }

    if (!best) {
      best = plans.find((p) => p.goal === goal);
    }

    if (!best && plans.length > 0) {
      best = plans[0];
    }

    if (best) {
      setSelectedPlan(best);
      setState({ index: 0 });
    }

    // читаем здоровье (шаг 2)
    try {
      const problems = JSON.parse(
        localStorage.getItem("q_problems") || "[]"
      ) as string[];
      const limits = JSON.parse(
        localStorage.getItem("q_limits") || "[]"
      ) as string[];
      const injury = localStorage.getItem("q_injury") || null;

      setHealth({ problems, injury, limits });
    } catch {
      // если вдруг что-то не так в localStorage — просто игнорируем
    }
  }, [plans]);

  if (!selectedPlan) {
    return (
      <div className="max-w-4xl mx-auto">
        <p className="text-sm text-slate-500">
          Подходящий план пока не найден. Пройдите опрос для подбора плана.
        </p>
      </div>
    );
  }

  const workouts = selectedPlan.workouts;
  const activeIndex = Math.min(state.index, Math.max(workouts.length - 1, 0));
  const activeWorkout = workouts[activeIndex];

  const hasSpine = health.problems.includes("spine");
  const hasJoints = health.problems.includes("joints");
  const hasHeart = health.problems.includes("heart");

  const avoidHeavy = health.limits.includes("heavy");
  const avoidRunJump = health.limits.includes("runJump");

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Голубые круги фоном */}
        <div className="pointer-events-none absolute -right-24 -top-20 h-40 w-40 rounded-full bg-sky-100 opacity-70" />
        <div className="pointer-events-none absolute -left-28 bottom-[-60px] h-44 w-44 rounded-full bg-sky-100 opacity-70" />

        <div className="relative rounded-3xl bg-white border border-slate-200 px-6 md:px-10 py-8 md:py-10 shadow-[0_20px_60px_rgba(15,23,42,0.12)] space-y-6">
          {/* Заголовок */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-1">
                {selectedPlan.title}
              </h1>
              <p className="text-xs md:text-sm text-slate-500">
                {selectedPlan.description}
              </p>
            </div>
          </div>

          {/* Блок предупреждений по здоровью */}
          {(health.problems.length > 0 || health.limits.length > 0) && (
            <div className="rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-xs md:text-sm text-amber-800 space-y-1">
              <p className="font-semibold">Учтены ограничения по здоровью:</p>
              {hasSpine && <p>• Избегайте упражнений с осевой нагрузкой на позвоночник и скручиваний.</p>}
              {hasJoints && <p>• Будьте осторожны с прыжками и тяжёлой нагрузкой на суставы.</p>}
              {hasHeart && <p>• Поддерживайте умеренный темп, избегайте высокоинтенсивного кардио.</p>}
              {avoidHeavy && <p>• Уменьшите веса, не работайте до отказа.</p>}
              {avoidRunJump && <p>• Заменяйте бег и прыжки на ходьбу или велотренажёр.</p>}
            </div>
          )}

          {/* Табы тренировок */}
          <div className="flex flex-wrap gap-3 text-xs md:text-sm font-medium text-slate-700 border-b border-slate-200 pb-3">
            {workouts.map((w, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setState({ index: idx })}
                  className={
                    "rounded-full px-4 py-2 transition " +
                    (isActive
                      ? "bg-sky-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200")
                  }
                >
                  {w.title}
                </button>
              );
            })}
          </div>

          {/* Активная тренировка */}
          {activeWorkout && (
            <div className="rounded-3xl border border-slate-200 bg-white px-6 md:px-8 py-6 md:py-7 shadow-[0_18px_40px_rgba(15,23,42,0.10)] space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-1">
                  {activeWorkout.title}
                </h2>
                <p className="text-xs text-slate-500">
                  {activeWorkout.description}
                </p>
              </div>

              <div className="mt-4 space-y-2 text-sm text-slate-800">
                {activeWorkout.exercises.map((ex) => (
                  <div
                    key={ex.id}
                    className="flex items-center justify-between border-b border-slate-200 py-2 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium">{ex.name}</p>
                      <p className="text-[11px] text-slate-500">
                        {ex.muscleGroup} · {ex.equipment}
                      </p>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {ex.sets}×{ex.reps}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}