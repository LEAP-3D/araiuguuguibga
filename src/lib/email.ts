import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

type DueRecord = { pet: string; type: string; medicine: string };

/**
 * Sends vaccine/medical reminder email to user.
 * Requires RESEND_API_KEY in .env. From address uses onboarding@resend.dev for free tier
 * or your verified domain.
 */
export async function sendVaccineReminderEmail(to: string, records: DueRecord[]): Promise<{ ok: boolean; error?: string }> {
  if (!resend) {
    return { ok: false, error: 'RESEND_API_KEY not configured' };
  }

  const from = process.env.RESEND_FROM_EMAIL || 'Pet App <onboarding@resend.dev>';
  const title = records.length === 1 ? 'Өнөөдөр вакцин / эрүүл мэндийн анхааруулга' : 'Өнөөдөр хэд хэдэн эрүүл мэндийн анхааруулга';
  const listHtml = records
    .map((r) => `<li><strong>${r.pet}</strong>: ${r.type}${r.medicine ? ` — ${r.medicine}` : ''}</li>`)
    .join('');

  const html = `
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
 * Sends "new rescue post" notification email to a user.
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
