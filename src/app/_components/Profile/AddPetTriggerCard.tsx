'use client';

import { PlusIcon } from 'lucide-react';

export function AddPetTriggerCard() {
  return (
    <button
      className="relative h-80 w-60 cursor-pointer overflow-hidden rounded-3xl p-4 text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-xl group"
      style={{
        background: 'linear-gradient(145deg, #fff8f0 0%, #fff3e8 100%)',
        border: '2px solid #ffd4a8',
        boxShadow: '0 4px 16px rgba(255, 140, 50, 0.1)',
      }}
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
            width: 56,
            height: 56,
            borderRadius: 18,
            background: 'linear-gradient(135deg, #ff9a3c, #ff6b35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(255, 107, 53, 0.4)',
          }}
        >
          <PlusIcon style={{ color: 'white', width: 28, height: 28, strokeWidth: 2.5 }} />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#3d2c1e' }}>Амьтан нэмэх</div>
          <div style={{ fontSize: 12, color: '#b08060', marginTop: 3, fontWeight: 500 }}>Шинэ тэжээвэр амьтан бүртгэх</div>
        </div>
      </div>
    </button>
  );
}
