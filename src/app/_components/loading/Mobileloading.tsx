export default function MobileLoading() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#FFF6EE]">
      {/* Logo */}
      <img src="/caticon.png" alt="PetWorld logo" className="w-24 h-24 mb-4 animate-bounce" />

      {/* Text */}
      <h1 className="text-2xl font-semibold text-[#fe8c09] tracking-wide">PetWorld</h1>
    </div>
  );
}
