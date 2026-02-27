import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import type { FormState } from './AddPostForm';
export type AnimalType = 'dog' | 'cat' | 'other';
export type AnimalSize = 'small' | 'medium' | 'large';

type Props = {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
};
export default function Details({ form, setForm }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        {/* Animal Type */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-foreground mb-2">Амьтны төрөл</label>
          <Select value={form.type} onValueChange={(value: AnimalType) => setForm((prev: FormState) => ({ ...prev, type: value }))}>
            <SelectTrigger className="h-12 w-full rounded-xl border px-5 py-2">
              <SelectValue placeholder="Select Type" className="leading-none" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="dog">Нохой</SelectItem>
              <SelectItem value="cat">Муур</SelectItem>
              <SelectItem value="other">Бусад</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Size */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-foreground mb-2"> Хэмжээ</label>
          <Select value={form.size} onValueChange={(value: AnimalSize) => setForm((prev: FormState) => ({ ...prev, size: value }))}>
            <SelectTrigger className="h-12 w-full rounded-xl border px-5 py-2 leading-none">
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="small">Жижиг</SelectItem>
              <SelectItem value="medium">Дунд</SelectItem>
              <SelectItem value="large">Том</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2"> Өнгө</label>
        <Input placeholder="e.g., Golden, Black and white" className="h-10" value={form.color} onChange={(e) => setForm((prev) => ({ ...prev, color: e.target.value }))} />
      </div>

      {form.status === 'lost' && (
        <>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Нэр</label>
            <Input placeholder="Амьтны нэр" className="h-10" value={form.petName} onChange={(e) => setForm((prev) => ({ ...prev, petName: e.target.value }))} />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-foreground mb-2">Үүлдэр</label>
              <Input placeholder="Жишээ: Golden Retriever" className="h-10" value={form.breed} onChange={(e) => setForm((prev) => ({ ...prev, breed: e.target.value }))} />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-foreground mb-2">Нас</label>
              <Input placeholder="Жишээ: 2 жил" className="h-10" value={form.age} onChange={(e) => setForm((prev) => ({ ...prev, age: e.target.value }))} />
            </div>
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2"> Тайлбар</label>
        <textarea
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-secondary border-2 border-transparent focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground resize-none"
          placeholder={form.status === 'lost' ? 'Алдагдсан газар, онцлог шинж, зан араншин зэргийг бичнэ үү...' : 'Хаана олсон, ямар байдалтай байсан талаар бичнэ үү...'}
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
        />
      </div>
    </div>
  );
}
