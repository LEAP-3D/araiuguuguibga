# Vercel дээр мэдэгдэл (Test товч) ажиллуулах

Vercel дээр deploy хийсний дараа **Test мэдэгдэл явуулах** товч ажиллахын тулд дараах env хувьсагчуудыг тохируулна.

## Vercel: Project → Settings → Environment Variables

### 1. Firebase Admin (backend — мэдэгдэл илгээх)

Дараах **3** хувьсагч заавал:

| Variable           | Value |
|-------------------|--------|
| `FB_PROJECT_ID`   | Жишээ: `pet-world-41d23` |
| `FB_CLIENT_EMAIL` | Жишээ: `firebase-adminsdk-xxx@pet-world-41d23.iam.gserviceaccount.com` |
| `FB_PRIVATE_KEY`  | Private key (доорх форматыг сахина) |

**FB_PRIVATE_KEY** — Vercel дээр нэг мөртэй байх ёстой, мөрийн шилжилтийг `\n` гэж бичнэ.

- **Сонголт A:** Хоёр талдаа хашилттай, дотор нь `\n` (backslash + n) бүхий нэг мөр:
  ```
  "-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
  ```
- **Сонголт B:** Хэрэв алдаа гарвал **FIREBASE_SERVICE_ACCOUNT_BASE64** ашиглана. Локал дээр:
  ```bash
  node scripts/setup-firebase-account.js path/to/your-service-account.json --base64
  ```
  Гарсан утгыг Vercel дээр `FIREBASE_SERVICE_ACCOUNT_BASE64` гэж тохируулна (энэ тохиолдолд `FB_*` гурвыг хоосон үлдээж болно).

### 2. Firebase Client (frontend — FCM token, мэдэгдэл авах)

Build-ийн үед `public/firebase-config.json` үүсгэгдэж, мэдэгдэл ажиллахын тулд эдгээр **NEXT_PUBLIC_*** хувьсагчууд заавал байна:

| Variable | Тайлбар |
|----------|--------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `xxx.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Төслийн ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `xxx.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Тоо |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:xxx:web:xxx` |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Заавал биш (analytics) |
| `NEXT_PUBLIC_FIREBASE_VAPID_KEY` | Cloud Messaging → Web Push certificates дээрх VAPID key |

Локал `.env` дээрх утгуудаа Vercel дээр хуулж тохируулбал хангалттай.

---

## Шалгах

1. Vercel дээр **Redeploy** (env нэмсний дараа).
2. Сайт нээгээд **Dashboard** → **Мэдэгдлийн тохиргоо шалгах** дарна → "Ажиллаж байна" гарах.
3. **Мэдэгдэл идэвхжүүлэх** → зөвшөөрнө.
4. **Test мэдэгдэл явуулах** дарна → "Илгээгдлээ" гарах.
5. Табыг хааж хэдэн секунд хүлээгээд мэдэгдэл ирнэ.

Хэрэв Test дарсан үед алдаа гарвал Vercel → Logs эсвэл браузерын Network tab-аас `/api/send-notification` хариуг шалгана.
