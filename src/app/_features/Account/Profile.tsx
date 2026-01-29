import ProfileCard from "@/app/_components/Account/ProfileCard";
import ProfileDetails from "@/app/_components/Account/ProfileDetails";

const Profile = () => {
  const morePets = [
    { id: 2, name: "Luna", breed: "Persian Cat", image: "🐱" },
    { id: 3, name: "Max", breed: "Labrador", image: "🐕" },
  ];

  const vaccineHistory = [
    {
      vaccine: "Rabies Vaccine",
      date: "Dec 15, 2024",
      nextDue: "Dec 15, 2025",
    },
    { vaccine: "DHPP Vaccine", date: "Nov 20, 2024", nextDue: "Nov 20, 2025" },
    { vaccine: "Bordetella", date: "Oct 10, 2024", nextDue: "Oct 10, 2025" },
  ];

  type Field = {
    label: string;
    value: string;
    span?: 1 | 2 | 3;
  };

  const ownerFields: Field[] = [
    { label: "Full Name", value: "Sarah Johnson" },
    { label: "Email", value: "sarah@example.com" },
    { label: "Location", value: "San Francisco, CA" },
    { label: "Phone", value: "+1 (555) 123-4567" },
    { label: "Bio", value: "Dog lover and animal welfare advocate" },
  ];

  const petFields: Field[] = [
    { label: "Name", value: "Buddy" },
    { label: "Breed", value: "Golden Retriever" },
    { label: "Age", value: "3 years" },
    { label: "Weight", value: "65 lbs" },
    { label: "Gender", value: "Male" },
    { label: "Color", value: "Golden" },
  ];

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <button className="mb-6 px-4 py-2 hover:bg-gray-100 rounded-lg transition">
          ← Back to home
        </button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* USER SECTION */}
          <div className="space-y-6">
            <ProfileCard
              name="Sarah Johnson"
              subtitle="sarah@example.com"
              location="📍 San Francisco, CA"
              emoji="👤"
              gradientFrom="blue-500"
              gradientTo="purple-500"
            />
            <ProfileDetails title="Owner Details" fields={ownerFields} />
          </div>

          {/* PET SECTION */}
          <div className="space-y-6">
            <ProfileCard
              name="Buddy"
              subtitle="Golden Retriever"
              location="🎂 3 years"
              emoji="🐕"
              gradientFrom="orange-400"
              gradientTo="pink-500"
            />
            <ProfileDetails title="Pet Details" fields={petFields} />
          </div>
        </div>

        {/* MORE PETS SECTION */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            🐾 My Pets
          </h3>
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-500 text-center cursor-pointer">
              <div className="text-5xl mb-2">🐕</div>
              <div className="font-semibold">Buddy</div>
              <div className="text-xs text-gray-600">Golden Retriever</div>
            </div>

            {morePets.map((pet) => (
              <div
                key={pet.id}
                className="p-4 rounded-2xl bg-gray-50 text-center cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="text-5xl mb-2">{pet.image}</div>
                <div className="font-semibold">{pet.name}</div>
                <div className="text-xs text-gray-600">{pet.breed}</div>
              </div>
            ))}

            <button className="p-4 rounded-2xl border-2 border-dashed border-gray-300 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <div className="text-5xl mb-2">➕</div>
              <div className="font-semibold text-gray-700">Add Pet</div>
              <div className="text-xs text-gray-500">Register new pet</div>
            </button>
          </div>
        </div>

        {/* VACCINE HISTORY */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            💉 Vaccination History
          </h3>
          <div className="space-y-3">
            {vaccineHistory.map((record, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  💉
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{record.vaccine}</p>
                  <p className="text-sm text-gray-600">
                    Last administered: {record.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Next due</p>
                  <p className="text-sm font-medium text-orange-600">
                    {record.nextDue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
