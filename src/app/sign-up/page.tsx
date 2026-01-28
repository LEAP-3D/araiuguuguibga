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
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState(""); // ✅ moved here
  const [touched, setTouched] = useState(false);
  const [form, setForm] = useState<User>({
    name: "",
    email: "",
    password: "",
  });
  const validatePassword = (pw: string) => {
    if (pw.length < 6) return "Password must be at least 6 characters long";
    const ok = /^(?=.*[A-Z])(?=.*\d)(?=.*[._-]).{6,}$/.test(pw);
    if (!ok)
      return "Password must contain a capital letter, a number, and one of . _ -";
    return "";
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setError("");

    const email = form.email.trim().toLowerCase();

    // EMAIL format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Enter a valid email address");
      return;
    }
    // allowed domains
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
        "Only Gmail, Yahoo, iCloud, or Outlook email addresses are allowed.",
      );
      return;
    }

    // PASSWORD validation
    const pwErr = validatePassword(form.password);
    if (pwErr) {
      setPasswordError(pwErr);
      return;
    }

    // saved users
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u) => u.email === email)) {
      setError("This email is already registered");
      return;
    }
    const newUser: User = { ...form, email };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    window.location.href = "/login";
  };

  const isEmailError = error.toLowerCase().includes("email");

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

          <h1 className="text-3xl font-bold mb-1">Create an account</h1>
          <p className="text-gray-500 mb-8">Join our community of pet lovers</p>

          <form onSubmit={submit} className="space-y-5">
            {/* NAME */}
            <input
              type="text"
              className="w-full rounded-xl border px-4 py-3"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            {/* EMAIL */}
            <input
              type="email"
              className={`w-full rounded-xl px-4 py-3 border transition ${
                touched && isEmailError
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                setError("");
              }}
              required
            />
            {/* PASSWORD */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full rounded-xl px-4 py-3 pr-12 border transition ${
                    touched && !isEmailError && passwordError
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Password"
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
              {touched && !isEmailError && passwordError && (
                <p className="text-sm text-red-500 mt-2">{passwordError}</p>
              )}
            </div>

            <button className="w-full rounded-xl bg-orange-500 text-white py-3 font-medium">
              Create account
            </button>
          </form>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 items-center justify-center bg-linear-to-br from-orange-400 to-orange-500">
        <AuthDecor />
      </div>
    </div>
  );
}
