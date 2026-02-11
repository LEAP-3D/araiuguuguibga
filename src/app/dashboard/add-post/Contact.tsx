import { Input } from '@/components/ui/input';
export default function Contact() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Your Name</label>
        <Input
          placeholder="Full name
"
          className="h-10"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
        <Input placeholder="+976 9999 9999" className="h-10" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Additional Notes (optional)</label>
        <textarea
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground resize-none"
          placeholder="Any extra info that could help..."
        />
      </div>
    </div>
  );
}
