"use client";

type ParallaxImageBgProps = {
  src?: string;
  overlay?: string;
  filter?: string;
  fixed?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function ParallaxImageBg({
  src = "/dog.png",
  overlay = "bg-white/70",
  filter,
  fixed = true,
  children,
  className = "",
}: ParallaxImageBgProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat ${fixed ? "bg-fixed" : ""}`}
        style={{
          backgroundImage: `url("${src}")`,
          filter: filter ?? undefined,
        }}
      />
      {overlay && <div className={`absolute inset-0 -z-[5] ${overlay}`} />}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
