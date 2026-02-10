'use client';

import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin, Phone, FileText, Edit2 } from 'lucide-react';

type OwnerDetails = {
  name: string;
  avatar: string;
  phone?: string;
  fullAddress?: string;
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
      <DialogContent className="sm:max-w-2xl rounded-3xl border-0 shadow-2xl p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br p-8 pb-10 relative">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }} className="text-2xl font-bold text-[#3b2f2f]">
              Profile Details
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="px-8 pb-8" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div className="-mt-10 mb-4">
            <div className="w-40 h-36 rounded-3xl overflow-hidden ring-4 ring-white shadow-lg bg-white">
              <Image src={owner.avatar || '/default-avatar.png'} alt={owner.name} width={112} height={112} className="w-full h-full object-cover" />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-foreground">{owner.name}</h3>
          <p className="text-base text-muted-foreground mb-6">Pet Parent</p>

          <div className="space-y-5">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Full Address</p>
                <p className="text-sm text-foreground">{owner.fullAddress || '—'}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent/25 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Phone</p>
                <p className="text-sm text-foreground">{owner.phone || '—'}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Notes</p>
                <p className="text-sm text-foreground leading-relaxed">{owner.notes || '—'}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onEdit();
            }}
            className="mt-8 w-full rounded-full py-2.5 bg-[#ef9241] text-white font-semibold flex items-center justify-center gap-2 hover:opacity-95"
          >
            <Edit2 className="w-5 h-5" />
            Edit Profile
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
