export default function Footer() {
  return (
    <div className="bg-[#fcba77] w-[] h-60 flex items-center justify-center text-black">
      <div className="flex flex-col gap-2 text-center items-center">
        <p className="text-[30px] font-black">Help Bring Them Home</p>
        <p className="tex-[20px] w-110 text-gray-800 text-center mb-2">Every report counts. Whether you found a stray or lost your beloved pet, our community is here to help.</p>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="py-2 px-8 bg-[#f88a0c] rounded-2xl">
              <span className="text-white">Post an Animal.</span>
            </div>
            <div className="py-2 px-8 border border-[#f88a0c] rounded-2xl">
              <span className="text-black ">Explore Map. </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
