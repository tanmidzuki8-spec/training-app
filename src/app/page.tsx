"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type UserState = {
  name: string | null;
  isLoggedIn: boolean;
};

export default function HomePage() {
  const [user, setUser] = useState<UserState>({
    name: null,
    isLoggedIn: false
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const name = localStorage.getItem("userName");
    setUser({ isLoggedIn, name: name || null });
  }, []);

  const isAuth = user.isLoggedIn;

  return (
    <div className="space-y-10">
      {/* Верхний блок */}
      <section className="rounded-2xl bg-sky-50 border border-sky-100 px-6 md:px-8 py-8 md:py-10 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-4">
          {isAuth ? (
            <>
              <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-slate-900">
                {user.name ? `Привет, ${user.name}!` : "Привет!"}
                <br />
                <span className="text-sky-600">
                  Продолжим тренировки на этой неделе
                </span>
              </h1>
              <p className="text-slate-600 max-w-md">
                На основе твоих ответов мы подобрали персональный план. Перейди
                к плану или посмотрим прогресс за последнюю неделю.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/plan"
                  className="inline-flex px-6 py-3 rounded-lg bg-sky-600 text-white font-semibold text-sm hover:bg-sky-500 transition"
                >
                  Перейти к плану
                </Link>
                <Link
                  href="/progress"
                  className="inline-flex px-6 py-3 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50 transition"
                >
                  Смотреть прогресс
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-slate-900">
                Получи персональный план тренировок
                <br />
                <span className="text-sky-600">за 30 секунд</span>
              </h1>
              <p className="text-slate-600 max-w-md">
                Ответь на несколько вопросов и получи готовый план тренировок
                на неделю, адаптированный под твои цели и уровень подготовки.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/questionnaire"
                  className="inline-flex px-6 py-3 rounded-lg bg-sky-600 text-white font-semibold text-sm hover:bg-sky-500 transition"
                >
                  Подобрать тренировку
                </Link>
                <Link
                  href="/library"
                  className="inline-flex px-6 py-3 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50 transition"
                >
                  Библиотека упражнений
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Картинка справа */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-[320px] h-[180px] md:w-[600px] md:h-[340px]">
            <Image
              src="/hero.png"
              alt="Персональный план тренировок"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Нижний блок «Это просто!» */}
      <section className="rounded-2xl bg-white border border-slate-200 px-8 py-8 space-y-6">
        <h2 className="text-center text-xl font-semibold text-slate-900">
          Это просто!
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
            <h3 className="font-semibold text-slate-900 mb-1">
              Ответь на 3 вопроса
            </h3>
            <p className="text-sm text-slate-600">
              Короткий опрос о целях, уровне и доступном времени.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
            <h3 className="font-semibold text-slate-900 mb-1">
              Получи план на неделю
            </h3>
            <p className="text-sm text-slate-600">
              Сформируем план тренировок под твои ответы и здоровье.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4">
            <h3 className="font-semibold text-slate-900 mb-1">
              Следи за прогрессом
            </h3>
            <p className="text-sm text-slate-600">
              Отмечай тренировки и смотри динамику результатов.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}