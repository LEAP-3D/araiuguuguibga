import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { SignInUpShell } from "@/app/_components/SignInUpShell";
import { signUpAppearance } from "@/app/_components/clerkAppearance";

export const dynamic = "force-dynamic";

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function SignUpPage() {
  return (
    <SignInUpShell>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-[420px] -mt-40">
          <Link
            href="/"
            className="absolute top-6 left-6 flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium drop-shadow-md transition-colors"
          >
            ← Back to home
          </Link>
          {clerkPublishableKey ? (
            <>
              <div className="mb-6 text-center text-white drop-shadow-md">
                <h1 className="text-2xl font-bold tracking-tight">Бүртгүүлэх</h1>
                <p className="text-white/90 text-sm mt-1">Шинэ бүртгэл үүсгээд эхлээрэй</p>
              </div>
              <SignUp
                signInUrl="/sign-in"
                afterSignUpUrl="/"
                appearance={signUpAppearance}
              />
              
            </>
          ) : (
            <div className="rounded-2xl bg-white/95 shadow-2xl p-8 text-center">
              <p className="text-slate-600 mb-4">
                Clerk тохируулах: <code className="bg-teal-50 text-teal-700 px-2 py-1 rounded-lg text-sm">.env.local</code>
              </p>
              <p className="text-sm text-slate-500">
                <Link href="/sign-in" className="text-teal-600 hover:underline">Нэвтрэх хуудас руу буцах</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </SignInUpShell>
  );
}
