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
    <form id="profile-details-form" onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Нэр</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-1.5 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
          placeholder="Таны нэр"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Утас</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-1.5 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
          placeholder="Таны утасны дугаар"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Танилцуулга</label>
        <textarea
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground resize-none"
          placeholder="Өөрийнхөө тухай бичнэ үү..."
        />
      </div>
    </form>
  );
}
