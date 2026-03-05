'use client';

import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Phone, FileText, Edit2 } from 'lucide-react';

type OwnerDetails = {
  name: string;
  avatar: string;
  phone?: string;
  notes?: string;
};

type Props = {
  owner: OwnerDetails;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
};

export default function ProfileDetailsDialog({ owner, open, onOpenChange, onEdit }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="mobile-system-font rounded-3xl border-0 p-0 shadow-2xl sm:max-w-lg">
        <div className="relative rounded-t-3xl bg-gradient-to-br from-[#fff5e8] via-[#fff9f2] to-[#fefdfc] p-6 pb-8">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }} className="text-2xl font-bold text-[#3b2f2f]">
              Профайлын мэдээлэл
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6 pt-2" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div className="-mt-6 mb-4">
            <div className="h-28 w-28 overflow-hidden rounded-2xl bg-white ring-4 ring-white shadow-lg">
              <Image src={owner.avatar || '/default-avatar.png'} alt={owner.name} width={112} height={112} className="h-full w-full object-cover" />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-foreground">{owner.name}</h3>
          <p className="text-base text-muted-foreground mb-6">Pet Parent</p>

          <div className="space-y-5">
            <div className="flex gap-4">
              <div className="h-12 w-12 shrink-0 rounded-2xl bg-[#f6f2e9] flex items-center justify-center">
                <Phone className="h-5 w-5 text-[#5e493a]" />
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#9b8b7b]">Утас</p>
                <p className="text-sm text-[#3d2c1e]">{owner.phone || '—'}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 shrink-0 rounded-2xl bg-[#fff2e8] flex items-center justify-center">
                <FileText className="h-5 w-5 text-[#c77739]" />
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#9b8b7b]">Тэмдэглэл</p>
                <p className="text-sm leading-relaxed text-[#3d2c1e]">{owner.notes || '—'}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onEdit();
            }}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ef9241] py-3 font-semibold text-white transition-all hover:bg-[#e6842f]"
          >
            <Edit2 className="h-5 w-5" />
            Профайл засах
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
