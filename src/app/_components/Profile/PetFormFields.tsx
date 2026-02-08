import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type PetForm = {
  imagePreview: string | null;
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'other' | '';
  breed: string;
  age: number;
  weight: number;
  gender: 'Em' | 'Er' | '';
  note: string;
  allergies: string;
};

type Props = {
  form: PetForm;
  setForm: React.Dispatch<React.SetStateAction<PetForm>>;
};

export function PetFormFields({ form, setForm }: Props) {
  return (
    <>
      <div>
        <label className="block text-lg font-medium mb-1">Амьтны нэр *</label>
        <input
          value={form.name || ''}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          className="w-full px-5 py-2 rounded-xl border-2  bg-[#fffef370] outline-none"
          placeholder="Амьтны нэр"
        />
      </div>
      <div className="flex justify-between">
        <div className=" flex flex-col gap-1">
          <label className="block text-sm font-medium ">төрөл *</label>
          <Select value={form.type || ''} onValueChange={(v) => setForm((f) => ({ ...f, type: v as 'dog' | 'cat' | 'bird' | 'other' }))}>
            <SelectTrigger className="px-5 py-5 rounded-xl border bg-[#fffef387]">
              <SelectValue placeholder="Төрөл" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dog">Нохой</SelectItem>
              <SelectItem value="cat">Муур</SelectItem>
              <SelectItem value="bird">Шувуу</SelectItem>
              <SelectItem value="other">Бусад</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className=" flex flex-col gap-1">
          <label className="block text-sm font-medium ">үүлдэр *</label>
          <input
            value={form.breed || ''}
            onChange={(e) => setForm((f) => ({ ...f, breed: e.target.value }))}
            placeholder="Үүлдэр"
            className="px-5 py-2 rounded-xl border bg-[#fffef387] outline-none"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className=" flex flex-col gap-1">
          <label className="block text-sm font-medium ">нас *</label>
          <input
            value={form.age || ''}
            onChange={(e) => setForm((f) => ({ ...f, age: Number(e.target.value) }))}
            placeholder="Нас"
            className="px-5 py-2 rounded-xl border bg-[#fffef387] outline-none w-30"
          />
        </div>
        <div className=" flex flex-col gap-1">
          <label className="block text-sm font-medium ">жин *</label>
          <input
            value={form.weight || ''}
            onChange={(e) => setForm((f) => ({ ...f, weight: Number(e.target.value) }))}
            placeholder="Жин (кг)"
            className="px-5 py-2 rounded-xl border bg-[#fffef387] outline-none w-40"
          />
        </div>
        <div className=" flex flex-col gap-1">
          <label className="block text-sm font-medium ">huis *</label>
          <Select value={form.gender || ''} onValueChange={(v) => setForm((f) => ({ ...f, gender: v as 'Em' | 'Er' }))}>
            <SelectTrigger className="px-5 py-5 rounded-xl border bg-[#fffef387]">
              <SelectValue placeholder="Huis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Em">Em</SelectItem>
              <SelectItem value="Er">Er</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className=" flex flex-col gap-1">
        <label className="block text-sm font-medium ">Тэмдэглэл *</label>
        <textarea
          rows={3}
          value={form.note || ''}
          onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl bg-[#fffef387] border-2 focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground resize-none"
          placeholder="Тэмдэглэл..."
        />
      </div>
      <div className="flex justify-between">
        <div className=" flex flex-col gap-1">
          <label className="block text-sm font-medium ">Xаршил</label>
          <input
            value={form.allergies || ''}
            onChange={(e) => setForm((f) => ({ ...f, allergies: e.target.value }))}
            placeholder="Xаршил"
            className="px-5 py-2 rounded-xl border bg-[#fffef387] outline-none "
          />
        </div>
      </div>
    </>
  );
}
