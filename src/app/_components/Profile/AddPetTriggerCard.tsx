'use client';

import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { PlusIcon } from 'lucide-react';

type AddPetTriggerCardProps = ComponentPropsWithoutRef<'button'> & {
  compact?: boolean;
};

export const AddPetTriggerCard = forwardRef<HTMLButtonElement, AddPetTriggerCardProps>(function AddPetTriggerCard({ className = '', style, type = 'button', compact = false, ...props }, ref) {
  return (
    <button
      ref={ref}
      type={type}
      className={`group relative cursor-pointer overflow-hidden rounded-3xl p-4 text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-xl ${
        compact ? 'h-52 w-40' : 'h-80 w-60'
      } ${className}`}
      style={{
        border: '2px dashed #ffd4a8',
        boxShadow: '0 4px 16px rgba(255, 140, 50, 0.1)',
        ...style,
      }}
      {...props}
    >
      <div
        style={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(255, 160, 60, 0.15)',
          transition: 'transform 0.3s',
        }}
        className="group-hover:scale-125"
      />
      <div
        style={{
          position: 'absolute',
          bottom: -16,
          left: -16,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'rgba(100, 200, 130, 0.15)',
          transition: 'transform 0.3s',
        }}
        className="group-hover:scale-125"
      />

      <div className="relative flex h-full flex-col items-center justify-center gap-3">
        <div
          className="group-hover:rotate-12 transition-transform duration-300"
          style={{
            width: compact ? 44 : 56,
            height: compact ? 44 : 56,
            borderRadius: compact ? 14 : 18,
            background: 'linear-gradient(135deg, #ffc9a4, #ffbe93)', // warm caramel/tan gradient
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(180, 140, 100, 0.35)', // warm shadow
          }}
        >
          <PlusIcon style={{ color: 'white', width: compact ? 22 : 28, height: compact ? 22 : 28, strokeWidth: 2.5 }} />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: compact ? 14 : 16, color: '#3d2c1e' }}>Амьтан нэмэх</div>
          <div style={{ fontSize: compact ? 11 : 12, color: '#b08060', marginTop: 3, fontWeight: 500 }}>Шинэ тэжээвэр амьтан бүртгэх</div>
        </div>
      </div>
    </button>
  );
});
