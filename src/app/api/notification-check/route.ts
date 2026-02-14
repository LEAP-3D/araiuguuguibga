import { NextResponse } from 'next/server';
import { getAdminMessaging } from '@/lib/firebase-admin';

/**
 * GET /api/notification-check
 * Нэг шалгалт: Firebase Admin тохиргоо зөв эсэх, notification илгээх боломжтой эсэхийг шалгана.
 */
export async function GET() {
  try {
    const hasFb =
      process.env.FB_PROJECT_ID && process.env.FB_CLIENT_EMAIL && process.env.FB_PRIVATE_KEY;
    const hasJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
    const hasBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64?.trim();
    const hasPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim();
    const hasCreds = !!(hasFb || hasJson || hasBase64 || hasPath);

    if (!hasCreds) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Credentials байхгүй. .env дээр FB_PROJECT_ID, FB_CLIENT_EMAIL, FB_PRIVATE_KEY тохируулна уу.',
        },
        { status: 500 }
      );
    }

    // Firebase Admin эхэлж, messaging instance авах боломжтой эсэх
    const messaging = getAdminMessaging();
    if (!messaging) {
      return NextResponse.json(
        { ok: false, message: 'Firebase Admin Messaging эхлэхгүй байна.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: 'Notification тохиргоо зөв. Post нэмэх эсвэл Test мэдэгдэл явуулах боломжтой.',
      credentialsSource: hasFb ? 'FB_PROJECT_ID + FB_CLIENT_EMAIL + FB_PRIVATE_KEY' : hasJson ? 'FIREBASE_SERVICE_ACCOUNT_JSON' : hasBase64 ? 'FIREBASE_SERVICE_ACCOUNT_BASE64' : 'FIREBASE_SERVICE_ACCOUNT_PATH',
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json(
      { ok: false, message: `Шалгалт амжилтгүй: ${message}` },
      { status: 500 }
    );
  }
}
