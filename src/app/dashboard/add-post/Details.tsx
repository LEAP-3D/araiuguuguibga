import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function Details() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        {/* Animal Type */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-foreground mb-2">Animal Type</label>
          <Select>
            <SelectTrigger className="h-12 w-full rounded-xl border px-5 py-2">
              <SelectValue placeholder="Select Type" className="leading-none" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="dog">Dog</SelectItem>
              <SelectItem value="cat">Cat</SelectItem>
              <SelectItem value="bird">Bird</SelectItem>
              <SelectItem value="rabbit">Rabbit</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Size */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-foreground mb-2">Size</label>
          <Select>
            <SelectTrigger className="h-12 w-full rounded-xl border px-5 py-2 leading-none">
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="small">Small</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
              <SelectItem value="extra-large">Extra Large</SelectItem>
            </SelectContent>
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
