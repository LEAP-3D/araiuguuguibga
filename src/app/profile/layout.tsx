// Opt out of static prerender so build does not require Clerk publishableKey at build time.
export const dynamic = 'force-dynamic';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
