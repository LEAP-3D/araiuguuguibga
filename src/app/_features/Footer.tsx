import Link from 'next/dist/client/link';

export default function Footer() {
  return (
    <div className="bg-[#fdc4a148] w-[] h-60 flex items-center justify-center text-black" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div className="flex flex-col gap-2 text-center items-center">
        <p className="text-[30px] font-black">Help Bring Them Home</p>
        <p className="tex-[20px] w-110 text-gray-800 text-center mb-2">Every report counts. Whether you found a stray or lost your beloved pet, our community is here to help.</p>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Link href="/dashboard/add-post">
              <div className="py-2 px-8 bg-[#f24e515a] rounded-2xl cursor-pointer">
                <span className="text-white">Post an Animal</span>
              </div>
            </Link>
            <Link href="/dashboard/map">
              <div className="py-2 px-10 border-2 border-[#f24e515a] rounded-2xl cursor-pointer">
                <span className="text-black ">Explore map</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
