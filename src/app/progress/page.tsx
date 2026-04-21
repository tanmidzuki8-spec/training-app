export default function ProgressPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Голубые круги */}
        <div className="pointer-events-none absolute -right-24 -top-20 h-40 w-40 rounded-full bg-sky-100 opacity-70" />
        <div className="pointer-events-none absolute -left-32 bottom-[-80px] h-52 w-52 rounded-full bg-sky-100 opacity-70" />

        <div className="relative rounded-3xl bg-white border border-slate-200 px-6 md:px-10 py-8 md:py-10 shadow-[0_20px_60px_rgba(15,23,42,0.12)] space-y-8">
          {/* Заголовок */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-1">
                Следи за тренировками
              </h1>
              <p className="text-xs md:text-sm text-slate-500">
                Отслеживай свои результаты и становись лучше с каждым днём.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-sky-500 px-3 py-1 text-[11px] font-semibold text-white">
              Прогресс
            </span>
          </div>

          {/* Статистика сверху */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl font-semibold text-slate-900">24</p>
              <p className="text-xs text-slate-500 mt-1">тренировки</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-slate-900">4 320</p>
              <p className="text-xs text-slate-500 mt-1">сжжено ккал</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-slate-900">86.5</p>
              <p className="text-xs text-slate-500 mt-1">кг жим лёжа</p>
            </div>
          </div>

          {/* Прогресс за 30 дней */}
          <div className="rounded-3xl border border-slate-200 bg-white px-6 md:px-8 py-6 shadow-[0_16px_36px_rgba(15,23,42,0.1)] space-y-4">
            <div className="flex items-center justify-between text-sm">
              <p className="font-semibold text-slate-900">
                Прогресс за последние 30 дней
              </p>
              <p className="text-xs text-slate-500">Апрель 2026</p>
            </div>

            {[
              { label: "Сила", value: 78, color: "bg-sky-500" },
              { label: "Выносливость", value: 64, color: "bg-emerald-500" },
              { label: "Гибкость", value: 42, color: "bg-indigo-500" },
              { label: "Вес", value: -4.2, color: "bg-orange-500" }
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-4 text-xs md:text-sm"
              >
                <span className="w-24 text-slate-700">{item.label}</span>
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-2 ${item.color}`}
                    style={{
                      width:
                        (item.label === "Вес"
                          ? Math.min(Math.abs(item.value), 100)
                          : item.value) + "%"
                    }}
                  />
                </div>
                <span
                  className={
                    "w-16 text-right font-semibold " +
                    (item.label === "Вес"
                      ? "text-emerald-600"
                      : "text-slate-800")
                  }
                >
                  {item.label === "Вес"
                    ? `${item.value} кг`
                    : `+${item.value}%`}
                </span>
              </div>
            ))}
          </div>

          {/* Последние тренировки */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-slate-900">
              Последние тренировки
            </p>

            <div className="space-y-2 text-xs md:text-sm">
              {[
                {
                  date: "17 МАР",
                  title: "Грудные + Трицепс",
                  time: "45 мин",
                  kcal: "320 ккал"
                },
                {
                  date: "15 МАР",
                  title: "Ноги + Пресс",
                  time: "50 мин",
                  kcal: "400 ккал"
                },
                {
                  date: "13 МАР",
                  title: "Кардио + Растяжка",
                  time: "35 мин",
                  kcal: "250 ккал"
                },
                {
                  date: "11 МАР",
                  title: "Спина + Бицепс",
                  time: "45 мин",
                  kcal: "310 ккал"
                }
              ].map((w) => (
                <div
                  key={w.title + w.date}
                  className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5"
                >
                  <div className="w-16 text-[11px] font-semibold text-slate-500">
                    {w.date}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{w.title}</p>
                    <p className="text-[11px] text-slate-500">
                      {w.time} · {w.kcal}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                    Выполнено
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-2 text-center text-xs text-slate-600">
              Ты на{" "}
              <span className="font-semibold text-sky-600">
                78% активнее, чем в прошлом месяце
              </span>
              . Так держать!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}