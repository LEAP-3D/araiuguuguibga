import { useEffect } from 'react';
import { getTodayStr } from './profileDateUtils';

type DueRecord = { pet: string; type: string; nextDueDate?: string };

/**
 * Мэдэгдэл: зөвхөн date эсвэл nextDueDate нь ӨНӨӨДӨР болсон бүртгэлд л гарна.
 * Жишээ: "3 сарын 1" гэж тэмдэглэсэн бол 3-р сарын 1-ний өдөр profile нээхэд мэдэгдэл ирнэ.
 */
export function useMedicalNotifications(dueTodayRecords: DueRecord[]) {
  useEffect(() => {
    if (dueTodayRecords.length === 0 || typeof window === 'undefined' || !('Notification' in window)) return;
    const today = getTodayStr();
    const key = 'medical-notif-date';
    const lastShown = localStorage.getItem(key);
    if (lastShown === today) return;
    if (Notification.permission === 'granted') {
      const title =
        dueTodayRecords.length === 1 ? '1 medical reminder today' : `${dueTodayRecords.length} medical reminders today`;
      const body = dueTodayRecords
        .slice(0, 3)
        .map((r) => `${r.pet}: ${r.type}${r.nextDueDate ? ' (due)' : ''}`)
        .join('; ');
      try {
        new Notification(title, { body });
        localStorage.setItem(key, today);
      } catch {
        // ignore
      }
      return;
    }
    if (Notification.permission === 'default') {
      void Notification.requestPermission().then((p) => {
        if (p === 'granted' && dueTodayRecords.length > 0) {
          try {
            new Notification(
              dueTodayRecords.length === 1 ? '1 medical reminder today' : `${dueTodayRecords.length} medical reminders today`,
              { body: dueTodayRecords.slice(0, 3).map((r) => `${r.pet}: ${r.type}`).join('; ') }
            );
            localStorage.setItem(key, today);
          } catch {
            // ignore
          }
        }
      });
    }
  }, [dueTodayRecords]);
}

/** Туршилт: ижил форматын мэдэгдэл гаргаж, зөвшөөрөл/хэлбэр ажиллаж байгааг шалгана. */
export function triggerTestMedicalNotification(): void {
  if (typeof window === 'undefined' || !('Notification' in window)) return;
  if (Notification.permission === 'granted') {
    new Notification('1 medical reminder today', {
      body: 'Туршилт: Нохой — Вакцин (due today)',
    });
  } else {
    void Notification.requestPermission().then((p) => {
      if (p === 'granted') {
        new Notification('1 medical reminder today', { body: 'Туршилт: Эрүүл мэндийн мэдэгдэл' });
      }
    });
  }
}
