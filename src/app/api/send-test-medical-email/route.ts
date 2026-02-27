import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { sendVaccineReminderEmail } from '@/lib/email';

/**
 * POST /api/send-test-medical-email
 * Sends a test vaccine reminder email to the current user's email.
 * Requires RESEND_API_KEY.
 */
export async function POST() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const primaryEmail =
      user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId) ?? user.emailAddresses[0];
    const email = primaryEmail?.emailAddress?.trim()?.toLowerCase();
    if (!email) {
      return NextResponse.json({ error: 'User email not found' }, { status: 400 });
    }

    const testRecords = [{ pet: 'Нохой (туршилт)', type: 'Вакцин', medicine: 'test' }];
    const result = await sendVaccineReminderEmail(email, testRecords);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('[send-test-medical-email]', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Server error' },
      { status: 500 }
    );
  }
}
