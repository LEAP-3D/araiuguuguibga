"use client";

export function ParallaxBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className="relative overflow-hidden min-h-screen"
      style={{
        background: `linear-gradient(
          180deg,
          #FFFFFF 0%,     /* цагаан */
          #FFF8E1 30%,    /* soft pastel шар */
          #FFD2A6 60%,    /* soft pastel улбар шар */
          #F7D6FF 100%    /* soft pastel ягаан */
        )`,
      }}
    >
      <div className="relative z-10">{children}</div>
    </section>
  );
}
