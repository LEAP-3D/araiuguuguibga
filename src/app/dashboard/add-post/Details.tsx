'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

type DetailsForm = {
  type: 'dog' | 'cat' | 'other';
  size?: string;
  breed: string;
  color: string;
  description: string;
};

type DetailsProps = {
  form: DetailsForm;
  setForm: React.Dispatch<React.SetStateAction<DetailsForm>>;
};

export default function Details({ form, setForm }: DetailsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        {/* Animal Type */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-foreground mb-2">Animal Type</label>
          <Select value={form.type} onValueChange={(value) => setForm((prev) => ({ ...prev, type: value as 'dog' | 'cat' | 'other' }))}>
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
          <Select value={form.size || ''} onValueChange={(value) => setForm((prev) => ({ ...prev, size: value }))}>
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

      {/* Breed */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Breed (optional)</label>
        <Input value={form.breed} onChange={(e) => setForm((prev) => ({ ...prev, breed: e.target.value }))} placeholder="e.g., Golden Retriever" className="h-10" />
      </div>

      {/* Color */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Color</label>
        <Input value={form.color} onChange={(e) => setForm((prev) => ({ ...prev, color: e.target.value }))} placeholder="e.g., Golden, Black and white" className="h-10" />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground resize-none"
          placeholder="Describe the animal, any distinctive features..."
        />
      </div>
    </div>
  );
}
