export default function ProfileDetails() {
  return (
    <div className="flex flex-col gap-2  ">
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
        <input
          className="w-full px-4 py-1.5 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
        <input
          className="w-full px-4 py-1.5 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
          placeholder="Your phone number"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Bio</label>
        <textarea
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground resize-none"
          placeholder="Tell us about yourself..."
        />
      </div>
    </div>
  );
}
