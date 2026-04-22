import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

type PageProps = {
  params: { id: string };
};

export default async function ExercisePage({ params }: PageProps) {
  const exerciseId = Number(params.id);

  try {
    const exercise = await prisma.exercise.findUnique({
      where: { id: exerciseId },
    });

    if (!exercise) {
      return (
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-slate-500">Упражнение не найдено.</p>
        </div>
      );
    }

    const workouts = await prisma.workout.findMany({
      where: {
        exercises: {
          some: { id: exerciseId },
        },
      },
      include: {
        plan: true,
      },
      orderBy: { id: "asc" },
    });

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="rounded-3xl bg-white border border-slate-200 px-6 md:px-10 py-8 md:py-10 shadow-[0_20px_60px_rgba(15,23,42,0.12)] space-y-4">
          <Link
            href="/library"
            className="text-xs text-sky-600 hover:text-sky-500"
          >
            ← Назад в библиотеку
          </Link>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-1">
                {exercise.name}
              </h1>
              <p className="text-xs md:text-sm text-slate-500">
                Мышечная группа:{" "}
                <span className="font-medium text-slate-700">
                  {exercise.muscleGroup}
                </span>
                {" · "}Инвентарь:{" "}
                <span className="font-medium text-slate-700">
                  {exercise.equipment || "без инвентаря"}
                </span>
              </p>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-full bg-sky-100 text-sky-700 font-medium">
              {exercise.level}
            </span>
          </div>

          <p className="text-sm text-slate-600 mt-2">{exercise.description}</p>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 px-6 md:px-10 py-6 md:py-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)] space-y-4">
          <h2 className="text-sm md:text-base font-semibold text-slate-900">
            В каких планах и днях используется это упражнение
          </h2>

          {workouts.length === 0 ? (
            <p className="text-xs text-slate-500">
              Пока ни один план не использует это упражнение.
            </p>
          ) : (
            <div className="space-y-2 text-xs md:text-sm">
              {workouts.map((w) => (
                <div
                  key={w.id}
                  className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-slate-900">{w.title}</p>
                    {w.plan && (
                      <p className="text-[11px] text-slate-500">
                        План:{" "}
                        <span className="font-medium text-slate-700">
                          {w.plan.title}
                        </span>{" "}
                        (цель: {w.plan.goal}, уровень: {w.plan.level})
                      </p>
                    )}
                  </div>
                  <Link
                    href="/plan"
                    className="text-[11px] text-sky-600 hover:text-sky-500 font-semibold"
                  >
                    Открыть план
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading exercise page:", error);

    return (
      <div className="max-w-4xl mx-auto p-6">
        <Link
          href="/library"
          className="text-xs text-sky-600 hover:text-sky-500"
        >
          ← Назад в библиотеку
        </Link>
        <h1 className="mt-4 text-lg font-semibold text-slate-900">
          Не удалось загрузить данные упражнения
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Возникла ошибка при обращении к базе данных. Попробуйте позже.
        </p>
      </div>
    );
  }
}