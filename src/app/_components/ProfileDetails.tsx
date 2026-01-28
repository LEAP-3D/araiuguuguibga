import { Edit2 } from "lucide-react";

interface DetailField {
  label: string;
  value: string;
  span?: 1 | 2 | 3;
}

interface ProfileDetailsProps {
  title: string;
  fields: DetailField[];
}

const ProfileDetails = ({ title, fields }: ProfileDetailsProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <button className="px-4 py-2 border rounded-xl hover:bg-gray-50 flex items-center">
          <Edit2 className="w-4 h-4 mr-1" /> Edit
        </button>
      </div>
      <div className="space-y-4">
        {fields.map((field, idx) => (
          <div
            key={idx}
            className={
              field.span === 2
                ? "grid sm:grid-cols-2 gap-4"
                : field.span === 3
                  ? "grid sm:grid-cols-3 gap-4"
                  : ""
            }
          >
            {field.span ? (
              field.value.split("|").map((val, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium mb-2">
                    {field.label.split("|")[i]}
                  </label>
                  <input
                    type="text"
                    value={val}
                    disabled
                    className="w-full px-4 py-2 border rounded-xl bg-gray-50"
                  />
                </div>
              ))
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2">
                  {field.label}
                </label>
                {field.label === "Bio" ? (
                  <textarea
                    value={field.value}
                    disabled
                    className="w-full px-4 py-2 border rounded-xl bg-gray-50 min-h-[80px]"
                  />
                ) : (
                  <input
                    type="text"
                    value={field.value}
                    disabled
                    className="w-full px-4 py-2 border rounded-xl bg-gray-50"
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileDetails;
