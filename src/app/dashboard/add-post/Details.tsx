import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
export default function Details() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Animal Type</label>
          <Select>
            <SelectTrigger className="px-5 py-2 rounded-xl border">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent></SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">Size</label>
          <Select>
            <SelectTrigger className="px-5 py-2 rounded-xl border">
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>
            <SelectContent></SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Breed (optional)</label>
        <Input placeholder="e.g., Golden Retriever" className="h-10" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Color</label>
        <Input placeholder="e.g., Golden, Black and white" className="h-10" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
        <textarea
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground resize-none"
          placeholder="Describe the animal, any distinctive features..."
        />
      </div>
    </div>
  );
}
