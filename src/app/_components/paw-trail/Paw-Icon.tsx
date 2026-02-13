export function PawIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      {/* Pad - Төв хэсэг нь арай илүү зүрх хэлбэртэй */}
      <path d="M12 11.5c-2.5 0-4.5 1.5-4.5 4.5 0 2 1.5 3.5 4.5 3.5s4.5-1.5 4.5-3.5c0-3-2-4.5-4.5-4.5z" />

      {/* Toes - Хуруунуудыг нь арай илүү жинхэнэ мөр шиг байрлууллаа */}
      {/* Far Left */}
      <circle cx="6.5" cy="11.5" r="2.2" />
      {/* Inner Left */}
      <circle cx="9.5" cy="7.5" r="2.5" />
      {/* Inner Right */}
      <circle cx="14.5" cy="7.5" r="2.5" />
      {/* Far Right */}
      <circle cx="17.5" cy="11.5" r="2.2" />
    </svg>
  );
}
