import { Camera } from "lucide-react";
interface ProfileCardProps {
  name: string;
  subtitle: string;
  location?: string;
  emoji: string;
  gradientFrom: string;
  gradientTo: string;
}

const ProfileCard = ({
  name,
  subtitle,
  location,
  emoji,
  gradientFrom,
  gradientTo,
}: ProfileCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div
        className={`h-24 bg-linear-to-r from-${gradientFrom} to-${gradientTo}`}
      />
      <div className="pt-0 -mt-12 text-center px-6 pb-6">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full bg-blue-500 text-white text-3xl flex items-center justify-center ring-4 ring-white">
            {emoji}
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shadow-lg hover:bg-gray-300">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <h2 className="text-xl font-bold mt-4">{name}</h2>
        <p className="text-sm text-gray-600">{subtitle}</p>
        {location && (
          <div className="flex items-center justify-center gap-1 mt-2 text-sm text-gray-600">
            {location}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
