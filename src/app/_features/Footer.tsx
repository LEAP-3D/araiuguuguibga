import Link from 'next/dist/client/link';

export default function Footer() {
  return (
    <div className="bg-[#ffc892b7] w-[] h-60 flex items-center justify-center text-black" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div className="flex flex-col gap-2 text-center items-center">
        <p className="text-[30px] font-black" style={{ fontStyle: 'italic', fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: '-0.01em' }}>
          Гэртэй болгоё
        </p>
        <p className="tex-[20px] w-110 text-gray-800 text-center mb-2">Та амьтан олсон эсвэл хайртай амьтнаа алдсан бол манай вебсайт танд туслахад бэлэн.</p>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Link href="/dashboard/add-post">
              <div className="py-2 px-8 bg-[#f88a0c] border-2 border-[#f88a0c] rounded-2xl cursor-pointer">
                <span className="text-white font-medium">Амьтан постлох</span>
              </div>
            </Link>
            <Link href="/dashboard/map">
              <div className="py-2 px-8 border-2 border-[#f88a0c] rounded-2xl cursor-pointer">
                <span className="text-black  font-medium">Газрын зураг харах</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
