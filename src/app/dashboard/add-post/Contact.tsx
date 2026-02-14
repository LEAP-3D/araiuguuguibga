'use client';

import { Input } from '@/components/ui/input';

type ContactForm = {
  contactName: string;
  phone: string;
  notes: string;
};

type ContactProps = {
  form: ContactForm;
  setForm: React.Dispatch<React.SetStateAction<ContactForm>>;
};

export default function Contact({ form, setForm }: ContactProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Your Name</label>
        <Input value={form.contactName ?? ''} onChange={(e) => setForm((prev) => ({ ...prev, contactName: e.target.value }))} placeholder="Full name" className="h-10" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
        <Input value={form.phone ?? ''} onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))} placeholder="+976 9999 9999" className="h-10" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Additional Notes (optional)</label>
        <textarea
          rows={3}
          value={form.notes ?? ''}
          onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground resize-none"
          placeholder="Any extra info that could help..."
        />
      </div>
    </div>
  );
}
