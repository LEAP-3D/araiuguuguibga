import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { VideoSection } from "@/app/_components/VideoSection";
import { signInAppearance } from "@/app/_components/clerkAppearance";

export const dynamic = "force-dynamic";

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function SignInPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <VideoSection />
      <div className="absolute inset-0 bg-black/40" aria-hidden />

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
                <h1 className="text-2xl font-bold tracking-tight">Тавтай морил</h1>
                <p className="text-white/90 text-sm mt-1">Бүртгэлтэй хаягаа оруулан нэвтэрнэ үү</p>
              </div>
              <SignIn
                signUpUrl="/sign-up"
                afterSignInUrl="/"
                appearance={signInAppearance}
              />
           
            </>
          ) : (
            <div className="rounded-2xl bg-white/95 shadow-2xl p-8 text-center">
              <p className="text-slate-600 mb-4">
                Clerk тохируулах: <code className="bg-teal-50 text-teal-700 px-2 py-1 rounded-lg text-sm">.env.local</code> файлд
              </p>
              <code className="block text-left text-sm bg-slate-50 p-4 rounded-xl overflow-x-auto border border-slate-100">
                NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
                <br />
                CLERK_SECRET_KEY=sk_test_...
              </code>
              <p className="text-sm text-slate-500 mt-4">
                <a href="https://clerk.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">clerk.com</a> дээр бүртгэл үүсгэнэ үү.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
