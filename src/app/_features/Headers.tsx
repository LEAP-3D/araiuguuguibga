"use client";

import { useRouter } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { HeaderShell, HeaderAuthButtons, HeaderUserMenu } from "./HeaderParts";

const hasClerkKey =
  typeof process !== "undefined" && !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

function HeadersWithClerk() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    const homeUrl = typeof window !== "undefined" ? window.location.origin + "/" : "/";
    await signOut({ redirectUrl: homeUrl });
    router.push("/");
  };

  const displayName =
    user?.fullName ||
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "Хэрэглэгч";
  const initial = (displayName as string).charAt(0).toUpperCase();

  return (
    <HeaderShell isSignedIn={isSignedIn}>
      {isSignedIn ? (
        <HeaderUserMenu
          displayName={displayName as string}
          initial={initial}
          imageUrl={user?.imageUrl}
          onSignOut={handleSignOut}
        />
      ) : (
        <HeaderAuthButtons />
      )}
    </HeaderShell>
  );
}

function HeadersWithoutClerk() {
  return (
    <HeaderShell isSignedIn={false}>
      <HeaderAuthButtons />
    </HeaderShell>
  );
}

export default function Headers() {
  return hasClerkKey ? <HeadersWithClerk /> : <HeadersWithoutClerk />;
}
