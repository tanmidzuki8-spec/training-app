import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

type ExerciseItem = {
  id: number;
  name: string;
  muscleGroup: string;
  equipment: string;
  level: string;
  description: string;
};

export default async function LibraryPage({
  searchParams,
}: {
  searchParams: { muscle?: string; level?: string };
}) {
  try {
    // 1. Загружаем все упражнения
    const exercises = await prisma.exercise.findMany({
      orderBy: { name: "asc" },
    });

    // 2. Считаем фильтры
    const muscleGroups = Array.from(
      new Set(exercises.map((e) => e.muscleGroup).filter(Boolean))
    ).sort();

    const levels = Array.from(
      new Set(exercises.map((e) => e.level).filter(Boolean))
    ).sort();

    const selectedMuscle = searchParams.muscle || "";
    const selectedLevel = searchParams.level || "";

    // 3. Убираем дубли
    const uniqueMap = new Map<string, ExerciseItem>();
    exercises.forEach((ex) => {
      const key = `${ex.name}_${ex.muscleGroup}`;
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, {
          id: ex.id,
          name: ex.name,
          muscleGroup: ex.muscleGroup,
          equipment: ex.equipment,
          level: ex.level,
          description: ex.description,
        });
      }
    });

    let uniqueExercises = Array.from(uniqueMap.values());

    // 4. Применяем фильтры
    if (selectedMuscle) {
      uniqueExercises = uniqueExercises.filter(
        (e) => e.muscleGroup === selectedMuscle
      );
    }
    if (selectedLevel) {
      uniqueExercises = uniqueExercises.filter(
        (e) => e.level === selectedLevel
      );
    }

    // 5. Основная разметка
    return (
      <div className="max-w-5xl mx-auto">
        <div className="rounded-3xl bg-white border border-slate-200 px-6 md:px-10 py-8 md:py-10 shadow-[0_20px_60px_rgba(15,23,42,0.12)] space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-1">
                Библиотека упражнений
              </h1>
              <p className="text-sm text-slate-600">
                Все упражнения из ваших планов тренировок. По клику откроется
                подробное описание.
              </p>
            </div>
          </div>

          {/* Фильтры */}
          <div className="flex flex-col md:flex-row gap-4 text-xs md:text-sm">
            <form className="flex flex-wrap gap-3 items-center">
              <span className="text-slate-600">Мышечная группа:</span>
              <Link
                href="/library"
                className={
                  "rounded-full px-3 py-1 border transition " +
                  (!selectedMuscle
                    ? "border-sky-500 bg-sky-50 text-sky-700"
                    : "border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100")
                }
              >
                Все
              </Link>
              {muscleGroups.map((m) => (
                <Link
                  key={m}
                  href={`/library?muscle=${encodeURIComponent(
                    m
                  )}&level=${encodeURIComponent(selectedLevel)}`}
                  className={
                    "rounded-full px-3 py-1 border transition " +
                    (selectedMuscle === m
                      ? "border-sky-500 bg-sky-50 text-sky-700"
                      : "border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100")
                  }
                >
                  {m}
                </Link>
              ))}
            </form>

            <form className="flex flex-wrap gap-3 items-center">
              <span className="text-slate-600">Уровень:</span>
              <Link
                href={
                  selectedMuscle
                    ? `/library?muscle=${encodeURIComponent(selectedMuscle)}`
                    : "/library"
                }
                className={
                  "rounded-full px-3 py-1 border transition " +
                  (!selectedLevel
                    ? "border-sky-500 bg-sky-50 text-sky-700"
                    : "border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100")
                }
              >
                Все
              </Link>
              {levels.map((lvl) => {
                const params = new URLSearchParams();
                if (selectedMuscle) params.set("muscle", selectedMuscle);
                params.set("level", lvl);
                const href = `/library?${params.toString()}`;

                return (
                  <Link
                    key={lvl}
                    href={href}
                    className={
                      "rounded-full px-3 py-1 border transition " +
                      (selectedLevel === lvl
                        ? "border-sky-500 bg-sky-50 text-sky-700"
                        : "border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100")
                    }
                  >
                    {lvl}
                  </Link>
                );
              })}
            </form>
          </div>

          {/* Карточки */}
          {uniqueExercises.length === 0 ? (
            <p className="text-sm text-slate-500">
              По выбранным фильтрам упражнений не найдено.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {uniqueExercises.map((ex) => (
                <Link
                  key={ex.id}
                  href={`/library/exercise/${ex.id}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 shadow-sm flex flex-col gap-2 hover:border-sky-300 hover:bg-sky-50 transition"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-sm font-semibold text-slate-900">
                      {ex.name}
                    </h2>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-sky-100 text-sky-700 font-medium">
                      {ex.level}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Мышечная группа:{" "}
                    <span className="font-medium text-slate-700">
                      {ex.muscleGroup}
                    </span>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Инвентарь:{" "}
                    <span className="font-medium text-slate-700">
                      {ex.equipment || "без инвентаря"}
                    </span>
                  </p>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-3">
                    {ex.description}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading library page:", error);

    return (
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
          Библиотека упражнений
        </h1>
        <p className="text-sm text-slate-600 mb-2">
          Не удалось загрузить список упражнений.
        </p>
        <p className="text-sm text-slate-500">
          Похоже, возникла проблема с подключением к базе данных. Попробуйте
          обновить страницу позже.
        </p>
        <Link
          href="/"
          className="inline-flex mt-4 text-xs text-sky-600 hover:text-sky-500"
        >
          ← На главную
        </Link>
      </div>
    );
  }
}