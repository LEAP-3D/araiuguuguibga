import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[5000] flex min-h-screen w-full items-center justify-center bg-[#F28A50]">
      <div className="flex flex-col items-center">
        <Image src="/caticon.png" alt="PetWorld logo" width={124} height={124} priority className="h-28 w-28 object-contain" />
      </div>
      <p className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] text-lg font-semibold tracking-wide text-white">PetWorld</p>
    </div>
  );
}
