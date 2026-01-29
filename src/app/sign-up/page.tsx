"use client";
import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthDecor from "../_components/AuthDecor";
type User = {
  name: string;
  email: string;
  password: string;
};
export default function Signup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [touched, setTouched] = useState(false);
  const [form, setForm] = useState<User>({
    name: "",
    email: "",
    password: "",
  });
  const validatePassword = (pw: string) => {
    if (pw.length < 6) return "Нууц үг 6 тэмдэгтээс урт байх ёстой.";
    const ok = /^(?=.*[A-Z])(?=.*\d)(?=.*[._-]).{6,}$/.test(pw);
    if (!ok)
      return "Нууц үгэнд том үсэг, тоо болон . _ - гэсэн тэмдэгтүүдийн аль нэгийг агуулсан байх ёстой.";
    return "";
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    setEmailError("");
    setPasswordError("");

    const email = form.email.trim().toLowerCase();

    let eErr = "";
    let pErr = "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      eErr = "Хүчинтэй имэйл хаяг оруулна уу";
    } else {
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
        eErr =
          "Зөвхөн Gmail, Yahoo, iCloud, or Outlook имэйл хаягуудыг зөвшөөрнө.";
      }
    }

    pErr = validatePassword(form.password);

    if (eErr) setEmailError(eErr);
    if (pErr) setPasswordError(pErr);

    if (eErr || pErr) return;

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === email)) {
      setEmailError("Энэ имэйл бүртгэлтэй байна");
      return;
    }

    const newUser: User = { ...form, email };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    window.location.href = "/login";
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
          <h1 className="text-3xl font-bold mb-1">Хаяг үүсгэх</h1>
          <p className="text-gray-500 mb-8">
            Манай тэжээвэр амьтан хайрлагчдын хамт олонд нэгдээрэй
          </p>
          <form onSubmit={submit} className="space-y-5">
            {/* NAME */}
            <input
              type="text"
              className="w-full rounded-xl border px-4 py-3"
              placeholder="Овог, нэр"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            {/* EMAIL */}
            <input
              type="email"
              className={`w-full rounded-xl px-4 py-3 border transition ${
                touched && emailError
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="нэр@example.com"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                setEmailError("");
              }}
              required
            />
            {touched && emailError && (
              <p className="text-sm text-red-500 mt-2">{emailError}</p>
            )}
            {/* PASSWORD */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full rounded-xl px-4 py-3 pr-12 border transition ${
                    touched && passwordError
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Нууц үг"
                  value={form.password}
                  onChange={(e) => {
                    const next = e.target.value;
                    setForm({ ...form, password: next });
                    if (touched) setPasswordError(validatePassword(next));
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {touched && passwordError && (
              <p className="text-sm text-red-500 mt-2">{passwordError}</p>
            )}
            <button className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white py-3 font-medium">
              Хаяг үүсгэх
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Бүртгэлтэй байна уу?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-orange-500 font-medium hover:underline"
            >
              Нэвтрэх
            </button>
          </p>
        </div>
      </div>
      <AuthDecor />
    </div>
  );
}
