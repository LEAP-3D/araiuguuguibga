'use client';

import { useState, useEffect } from 'react';

export type ProfileFormData = {
  name: string;
  phone: string;
  bio: string;
};

type Props = {
  initialName?: string;
  initialPhone?: string;
  initialBio?: string;
  onSave?: (data: ProfileFormData) => void;
};

export default function ProfileDetails({ initialName = '', initialPhone = '', initialBio = '', onSave }: Props) {
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [bio, setBio] = useState(initialBio);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setName(initialName);
      setPhone(initialPhone);
      setBio(initialBio);
    });
    return () => cancelAnimationFrame(id);
  }, [initialName, initialPhone, initialBio]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.({ name, phone, bio });
  };

  return (
    <form id="profile-details-form" onSubmit={handleSubmit} className="flex flex-col gap-4" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-[#5e493a]">Нэр</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-[#eadfce] bg-[#fffdf9] px-4 py-2.5 text-sm text-[#3d2c1e] outline-none transition-colors placeholder:text-[#b8a79a] focus:border-[#ef9241]"
          placeholder="Таны нэр"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-[#5e493a]">Утас</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-xl border border-[#eadfce] bg-[#fffdf9] px-4 py-2.5 text-sm text-[#3d2c1e] outline-none transition-colors placeholder:text-[#b8a79a] focus:border-[#ef9241]"
          placeholder="Таны утасны дугаар"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-[#5e493a]">Танилцуулга</label>
        <textarea
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full resize-none rounded-xl border border-[#eadfce] bg-[#fffdf9] px-4 py-3 text-sm text-[#3d2c1e] outline-none transition-colors placeholder:text-[#b8a79a] focus:border-[#ef9241]"
          placeholder="Өөрийнхөө тухай бичнэ үү..."
        />
      </div>
    </form>
  );
}
