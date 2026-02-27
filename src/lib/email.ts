import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/** Domain not verified – only send to Resend account owner's email */
const ALLOWED_EMAILS = ['enkheetuyatsetseg@gmail.com'] as const;

const RATE_LIMIT_MS = 600; // ~1.6 req/sec, safely under 2/sec
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

type DueRecord = { pet: string; type: string; medicine: string };

function buildVaccineReminderHtml(records: DueRecord[]): string {
  const title = records.length === 1 ? 'Өнөөдөр вакцин / эрүүл мэндийн анхааруулга' : 'Өнөөдөр хэд хэдэн эрүүл мэндийн анхааруулга';
  const listHtml = records
    .map((r) => `<li><strong>${r.pet}</strong>: ${r.type}${r.medicine ? ` — ${r.medicine}` : ''}</li>`)
    .join('');
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${title}</title></head>
<body style="font-family: system-ui, -apple-system, sans-serif; padding: 24px; max-width: 480px; margin: 0 auto;">
  <h2 style="color: #43342D;">${title}</h2>
  <p>Сайн байна уу,</p>
  <p>Өнөөдөр дараах тэжээвэр амьтдын вакцин / эрүүл мэндийн бүртгэл хийх өдөр болж байна:</p>
  <ul style="line-height: 1.8;">${listHtml}</ul>
  <p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://your-app.vercel.app'}/profile" style="color: #fc8d0e; font-weight: 600;">Профайл руу орох →</a></p>
  <p style="color: #888; font-size: 12px;">Энэ имэйл нь Pet App-аас автоматаар илгээгдсэн.</p>
</body>
</html>
`;
}

/**
 * Sends vaccine/medical reminder emails in one batch request.
 * Avoids Rate Limit 429. Each user gets personalized content (their records).
 */
export async function sendVaccineReminderEmailsBatch(
  items: { to: string; records: DueRecord[] }[]
): Promise<{ ok: boolean; sent: number; error?: string }> {
  if (!resend) {
    return { ok: false, sent: 0, error: 'RESEND_API_KEY not configured' };
  }
  const allowedSet = new Set(ALLOWED_EMAILS.map((e) => e.toLowerCase()));
  const valid = items.filter(
    (i) => i.to?.trim() && i.records.length > 0 && allowedSet.has(i.to.trim().toLowerCase())
  );
  if (valid.length === 0) return { ok: true, sent: 0 };
  const from = process.env.RESEND_FROM_EMAIL || 'Pet App <onboarding@resend.dev>';
  const batch = valid.map(({ to, records }) => {
    const title = records.length === 1 ? 'Өнөөдөр вакцин / эрүүл мэндийн анхааруулга' : 'Өнөөдөр хэд хэдэн эрүүл мэндийн анхааруулга';
    return {
      from,
      to: [to.trim()],
      subject: title,
      html: buildVaccineReminderHtml(records),
    };
  });
  const BATCH_SIZE = 100;
  let totalSent = 0;
  try {
    for (let i = 0; i < batch.length; i += BATCH_SIZE) {
      if (i > 0) await sleep(RATE_LIMIT_MS);
      const chunk = batch.slice(i, i + BATCH_SIZE);
      const { error } = await resend.batch.send(chunk);
      if (error) return { ok: false, sent: totalSent, error: error.message };
      totalSent += chunk.length;
    }
    return { ok: true, sent: totalSent };
  } catch (e) {
    return { ok: false, sent: totalSent, error: e instanceof Error ? e.message : 'Failed to send batch emails' };
  }
}

/**
 * Sends vaccine/medical reminder email to user (single recipient).
 * Requires RESEND_API_KEY in .env. From address uses onboarding@resend.dev for free tier
 * or your verified domain.
 */
export async function sendVaccineReminderEmail(to: string, records: DueRecord[]): Promise<{ ok: boolean; error?: string }> {
  if (!resend) {
    return { ok: false, error: 'RESEND_API_KEY not configured' };
  }

  const from = process.env.RESEND_FROM_EMAIL || 'Pet App <onboarding@resend.dev>';
  const html = buildVaccineReminderHtml(records);
  const title = records.length === 1 ? 'Өнөөдөр вакцин / эрүүл мэндийн анхааруулга' : 'Өнөөдөр хэд хэдэн эрүүл мэндийн анхааруулга';
  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject: title,
      html,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to send email' };
  }
}

/**
 * Sends "new rescue post" notification emails via Batch API.
 * Uses hardcoded ALLOWED_EMAILS (domain not verified – resend.dev restriction).
 * Rate limited to max 2 requests/second.
 */
export async function sendNewPostEmailsBatch(
  _to: string[],
  postName: string,
  posterName?: string
): Promise<{ ok: boolean; sent: number; error?: string }> {
  if (!resend) {
    return { ok: false, sent: 0, error: 'RESEND_API_KEY not configured' };
  }
  const from = process.env.RESEND_FROM_EMAIL || 'Pet App <onboarding@resend.dev>';
  const subject = 'Шинэ тусламж хэрэгтэй амьтан — ' + (postName || 'Пост');
  const posterText = posterName ? `${posterName} нэртэй хэрэглэгч` : 'Нэгэн хэрэглэгч';
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${subject}</title></head>
<body style="font-family: system-ui, -apple-system, sans-serif; padding: 24px; max-width: 480px; margin: 0 auto;">
  <h2 style="color: #43342D;">Шинэ тусламж хэрэгтэй амьтан</h2>
  <p>Сайн байна уу,</p>
  <p>${posterText} шинэ пост орууллаа: <strong>${postName || 'Амьтан'}</strong></p>
  <p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://your-app.vercel.app'}/dashboard/find-animals" style="color: #fc8d0e; font-weight: 600;">Пост харах →</a></p>
  <p style="color: #888; font-size: 12px;">Энэ имэйл нь Pet App-аас автоматаар илгээгдсэн.</p>
</body>
</html>
`;
  const batch = [...ALLOWED_EMAILS].map((email) => ({ from, to: [email], subject, html }));
  try {
    const { error } = await resend.batch.send(batch);
    if (error) return { ok: false, sent: 0, error: error.message };
    return { ok: true, sent: batch.length };
  } catch (e) {
    return { ok: false, sent: 0, error: e instanceof Error ? e.message : 'Failed to send emails' };
  }
}

/**
 * Sends "new rescue post" notification email to a user (single recipient).
 */
export async function sendNewPostEmail(to: string, postName: string, posterName?: string): Promise<{ ok: boolean; error?: string }> {
  if (!resend) {
    return { ok: false, error: 'RESEND_API_KEY not configured' };
  }

  const from = process.env.RESEND_FROM_EMAIL || 'Pet App <onboarding@resend.dev>';
  const subject = 'Шинэ тусламж хэрэгтэй амьтан — ' + (postName || 'Пост');
  const posterText = posterName ? `${posterName} нэртэй хэрэглэгч` : 'Нэгэн хэрэглэгч';
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${subject}</title></head>
<body style="font-family: system-ui, -apple-system, sans-serif; padding: 24px; max-width: 480px; margin: 0 auto;">
  <h2 style="color: #43342D;">Шинэ тусламж хэрэгтэй амьтан</h2>
  <p>Сайн байна уу,</p>
  <p>${posterText} шинэ пост орууллаа: <strong>${postName || 'Амьтан'}</strong></p>
  <p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://your-app.vercel.app'}/dashboard/find-animals" style="color: #fc8d0e; font-weight: 600;">Пост харах →</a></p>
  <p style="color: #888; font-size: 12px;">Энэ имэйл нь Pet App-аас автоматаар илгээгдсэн.</p>
</body>
</html>
`;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to send email' };
  }
}
