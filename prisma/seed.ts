import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Очищаем старые данные
  await prisma.exercise.deleteMany();
  await prisma.workout.deleteMany();
  await prisma.plan.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "demo@example.com",
      name: "Demo User"
    }
  });

  // ПЛАН 1: Похудение — начинающий — 3 дня (7-дневная структура)
  await prisma.plan.create({
    data: {
      title: "Похудение — 3 дня (начинающий)",
      description:
        "Базовый план на 3 тренировки в неделю для снижения веса, с днями отдыха.",
      level: "начинающий",
      goal: "похудение",
      daysPerWeek: 3,
      userId: user.id,
      workouts: {
        create: [
          {
            title: "Понедельник — Все тело (легко)",
            description: "Круговая тренировка на всё тело.",
            exercises: {
              create: [
                {
                  name: "Приседания",
                  muscleGroup: "ноги",
                  equipment: "вес тела",
                  level: "начинающий",
                  description: "3 подхода по 12 повторений",
                  sets: 3,
                  reps: 12
                },
                {
                  name: "Отжимания от пола",
                  muscleGroup: "грудь",
                  equipment: "вес тела",
                  level: "начинающий",
                  description: "3 подхода по 8–10 повторений",
                  sets: 3,
                  reps: 10
                }
              ]
            }
          },
          {
            title: "Вторник — Восстановление",
            description: "Лёгкая активность и растяжка.",
            exercises: {
              create: [
                {
                  name: "Ходьба",
                  muscleGroup: "кардио",
                  equipment: "без инвентаря",
                  level: "начинающий",
                  description: "20–30 минут ходьбы",
                  sets: 1,
                  reps: 20
                }
              ]
            }
          },
          {
            title: "Среда — Кор и ноги",
            description: "Упражнения на мышцы кора и ноги.",
            exercises: {
              create: [
                {
                  name: "Планка",
                  muscleGroup: "кор",
                  equipment: "вес тела",
                  level: "начинающий",
                  description: "3 подхода по 30 секунд",
                  sets: 3,
                  reps: 30
                },
                {
                  name: "Выпады",
                  muscleGroup: "ноги",
                  equipment: "вес тела",
                  level: "начинающий",
                  description: "3 подхода по 10 повторений на ногу",
                  sets: 3,
                  reps: 10
                }
              ]
            }
          },
          {
            title: "Четверг — День отдыха",
            description: "Полноценный день восстановления.",
            exercises: { create: [] }
          },
          {
            title: "Пятница — Верх тела",
            description: "Упражнения на спину и руки.",
            exercises: {
              create: [
                {
                  name: "Тяга гантелей в наклоне",
                  muscleGroup: "спина",
                  equipment: "гантели",
                  level: "начинающий",
                  description: "3 подхода по 10 повторений",
                  sets: 3,
                  reps: 10
                }
              ]
            }
          },
          {
            title: "Суббота — Кардио",
            description: "Лёгкое кардио.",
            exercises: {
              create: [
                {
                  name: "Лёгкий бег",
                  muscleGroup: "кардио",
                  equipment: "дорожка/улица",
                  level: "начинающий",
                  description: "20–30 минут",
                  sets: 1,
                  reps: 20
                }
              ]
            }
          },
          {
            title: "Воскресенье — Отдых",
            description: "День полного отдыха.",
            exercises: { create: [] }
          }
        ]
      }
    }
  });

  // ПЛАН 2: Похудение — средний — 5 дней (7-дневная структура)
  await prisma.plan.create({
    data: {
      title: "Похудение — 5 дней (средний)",
      description:
        "Интенсивный план на 5 тренировок в неделю для снижения веса.",
      level: "средний",
      goal: "похудение",
      daysPerWeek: 5,
      userId: user.id,
      workouts: {
        create: [
          {
            title: "Понедельник — Верх тела",
            description: "Силовая на грудь и спину.",
            exercises: {
              create: [
                {
                  name: "Жим гантелей лежа",
                  muscleGroup: "грудь",
                  equipment: "гантели",
                  level: "средний",
                  description: "4 подхода по 10 повторений",
                  sets: 4,
                  reps: 10
                },
                {
                  name: "Тяга верхнего блока",
                  muscleGroup: "спина",
                  equipment: "тренажёр",
                  level: "средний",
                  description: "4 подхода по 10–12 повторений",
                  sets: 4,
                  reps: 12
                }
              ]
            }
          },
          {
            title: "Вторник — Ноги",
            description: "Упражнения на ноги и ягодицы.",
            exercises: {
              create: [
                {
                  name: "Приседания со штангой",
                  muscleGroup: "ноги",
                  equipment: "штанга",
                  level: "средний",
                  description: "4 подхода по 8–10 повторений",
                  sets: 4,
                  reps: 10
                }
              ]
            }
          },
          {
            title: "Среда — Кардио",
            description: "Интервальное кардио.",
            exercises: {
              create: [
                {
                  name: "Интервальный бег",
                  muscleGroup: "кардио",
                  equipment: "дорожка",
                  level: "средний",
                  description: "30 минут, интервалы бег/шаг",
                  sets: 1,
                  reps: 30
                }
              ]
            }
          },
          {
            title: "Четверг — Кор",
            description: "Упражнения на мышцы пресса и кора.",
            exercises: {
              create: [
                {
                  name: "Скручивания",
                  muscleGroup: "кор",
                  equipment: "вес тела",
                  level: "средний",
                  description: "3 подхода по 15 повторений",
                  sets: 3,
                  reps: 15
                }
              ]
            }
          },
          {
            title: "Пятница — Верх тела (облегчённо)",
            description: "Поддерживающая тренировка на верх тела.",
            exercises: {
              create: [
                {
                  name: "Тяга гантели в наклоне",
                  muscleGroup: "спина",
                  equipment: "гантели",
                  level: "средний",
                  description: "3 подхода по 10 повторений",
                  sets: 3,
                  reps: 10
                }
              ]
            }
          },
          {
            title: "Суббота — Лёгкая активность",
            description: "Ходьба или велотренажёр в лёгком темпе.",
            exercises: {
              create: [
                {
                  name: "Ходьба",
                  muscleGroup: "кардио",
                  equipment: "без инвентаря",
                  level: "средний",
                  description: "30–40 минут",
                  sets: 1,
                  reps: 30
                }
              ]
            }
          },
          {
            title: "Воскресенье — Отдых",
            description: "Полноценный отдых.",
            exercises: { create: [] }
          }
        ]
      }
    }
  });

  // ПЛАН 3: Набор массы — продвинутый — 4 дня (7-дневная структура)
  await prisma.plan.create({
    data: {
      title: "Набор массы — 4 дня (продвинутый)",
      description: "Продвинутый сплит на набор мышечной массы.",
      level: "продвинутый",
      goal: "набор массы",
      daysPerWeek: 4,
      userId: user.id,
      workouts: {
        create: [
          {
            title: "Понедельник — Грудь и трицепс (продвинутый)",
            description: "Тяжёлая силовая тренировка.",
            exercises: {
              create: [
                {
                  name: "Жим штанги лежа (тяжёлый)",
                  muscleGroup: "грудь",
                  equipment: "штанга",
                  level: "продвинутый",
                  description: "5 подходов по 5–6 повторений",
                  sets: 5,
                  reps: 6
                },
                {
                  name: "Французский жим с штангой",
                  muscleGroup: "трицепс",
                  equipment: "штанга",
                  level: "продвинутый",
                  description: "4 подхода по 8–10 повторений",
                  sets: 4,
                  reps: 10
                }
              ]
            }
          },
          {
            title: "Вторник — Спина и бицепс (продвинутый)",
            description: "Тяговые упражнения с большим весом.",
            exercises: {
              create: [
                {
                  name: "Становая тяга",
                  muscleGroup: "спина",
                  equipment: "штанга",
                  level: "продвинутый",
                  description: "4 подхода по 5–6 повторений",
                  sets: 4,
                  reps: 6
                },
                {
                  name: "Подъёмы штанги на бицепс",
                  muscleGroup: "руки",
                  equipment: "штанга",
                  level: "продвинутый",
                  description: "4 подхода по 8–10 повторений",
                  sets: 4,
                  reps: 10
                }
              ]
            }
          },
          {
            title: "Четверг — Ноги (продвинутый)",
            description: "Тяжёлая тренировка на ноги.",
            exercises: {
              create: [
                {
                  name: "Приседания со штангой (тяжёлые)",
                  muscleGroup: "ноги",
                  equipment: "штанга",
                  level: "продвинутый",
                  description: "5 подходов по 5–6 повторений",
                  sets: 5,
                  reps: 6
                }
              ]
            }
          },
          {
            title: "Пятница — Плечи и руки (продвинутый)",
            description: "Работа на плечевой пояс и руки.",
            exercises: {
              create: [
                {
                  name: "Жим штанги стоя",
                  muscleGroup: "плечи",
                  equipment: "штанга",
                  level: "продвинутый",
                  description: "4 подхода по 6–8 повторений",
                  sets: 4,
                  reps: 8
                }
              ]
            }
          },
          {
            title: "Среда — Отдых",
            description: "День отдыха.",
            exercises: { create: [] }
          },
          {
            title: "Суббота — Активное восстановление",
            description: "Лёгкая активность: прогулка, растяжка.",
            exercises: {
              create: [
                {
                  name: "Растяжка всего тела",
                  muscleGroup: "всё тело",
                  equipment: "без инвентаря",
                  level: "продвинутый",
                  description: "10–15 минут мягкой растяжки",
                  sets: 1,
                  reps: 10
                }
              ]
            }
          },
          {
            title: "Воскресенье — Отдых",
            description: "Полный отдых.",
            exercises: { create: [] }
          }
        ]
      }
    }
  });

  console.log("Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });