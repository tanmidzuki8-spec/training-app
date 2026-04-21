"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userName = name || "Пользователь";
      const userEmail = email;

      if (typeof window !== "undefined") {
        localStorage.setItem("userName", userName);
        localStorage.setItem("userEmail", userEmail);
        localStorage.setItem("isLoggedIn", "true");
      }

      router.push("/profile");
    } catch (err) {
      console.error(err);
      setError("Ошибка регистрации");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 rounded-2xl bg-white border border-slate-200 px-8 py-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-slate-900 mb-1">
        Регистрация
      </h1>
      <p className="text-sm text-slate-600 mb-6">
        Создайте аккаунт, чтобы получить доступ к персональному плану
        тренировок и отслеживать прогресс.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Имя
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="Введите ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Пароль
          </label>
          <input
            type="password"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="Придумайте пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 inline-flex justify-center px-4 py-2.5 rounded-lg bg-sky-600 text-white text-sm font-semibold hover:bg-sky-500 transition disabled:opacity-60"
        >
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>

        {error && (
          <p className="mt-2 text-xs text-red-500">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}