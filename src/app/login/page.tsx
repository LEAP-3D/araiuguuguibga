"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft, Mail, Lock } from "lucide-react";
import AuthDecor from "../_components/AuthDecor";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const email = form.email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Хүчинтэй имэйл хаяг оруулна уу");
      return;
    }

    const ALLOWED_DOMAINS = [
      "gmail.com",
      "yahoo.com",
      "icloud.com",
      "me.com",
      "outlook.com",
      "hotmail.com",
      "live.com",
    ];

    const domain = email.split("@")[1];
    if (!ALLOWED_DOMAINS.includes(domain)) {
      setError(
        "Зөвхөн Gmail, Yahoo, iCloud, эсвэл Outlook имэйл хаяг зөвшөөрнө.",
      );
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    type User = { email: string; password: string };

    const existingUser = (users as User[]).find((u) => u.email === email);

    if (!existingUser) {
      setError("Ийм имэйлтэй хэрэглэгч олдсонгүй");
      return;
    }

    if (existingUser.password !== form.password) {
      setError("Нууц үг буруу байна");
      return;
    }

    // SUCCESS LOGIN
    localStorage.setItem("currentUser", JSON.stringify(existingUser));
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex bg-[#fffaf6]">
      <div className="flex-1 flex items-center justify-center px-10">
        <div className="w-full max-w-md">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-sm text-gray-600 mb-8"
          >
            <ArrowLeft size={16} />
            Back to home
          </button>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">🐾</span>
            <span className="font-bold text-xl text-orange-500">PawCare</span>
          </div>

          {/* Header */}
          <h1 className="text-3xl font-bold mb-1">Тавтай морил</h1>
          <p className="text-gray-500 mb-8">Үргэлжлүүлэхийн тулд нэвтэрнэ үү</p>

          {/* Form */}
          <form onSubmit={submit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium">И-мэйл</label>
              <div className="relative mt-2">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  className="w-full rounded-xl border px-11 py-3 bg-white"
                  placeholder="нэр@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">Нууц үг</label>
              <div className="relative mt-2">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-xl border px-11 py-3 pr-12 bg-white"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white py-3 font-medium transition disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Бүртгэлгүй байна уу?{" "}
            <button
              type="button"
              onClick={() => router.push("/sign-up")}
              className="text-orange-500 font-medium hover:underline"
            >
              Бүртгүүлэх
            </button>
          </p>
        </div>
      </div>

      <AuthDecor />
    </div>
  );
}
