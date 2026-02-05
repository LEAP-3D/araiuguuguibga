This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Gmail / Google-ээр нэвтрэх

Gmail (Google)-ээр бүртгүүлэх/нэвтрэхийг ажиллуулахын тулд:

1. **Clerk Dashboard** → [dashboard.clerk.com](https://dashboard.clerk.com) → **User & Authentication** → **Social connections** → **Google**-г идэвхжүүл.
2. **Google Cloud Console** дээр OAuth 2.0 Client ID үүсгээд Client ID болон Secret-ийг Clerk-д оруулна.
3. Хэрэв OAuth дараа redirect ажиллахгүй бол `.env` дээр нэмээрэй:
   - `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/`
4. Production дээр deploy хийсэн бол `NEXT_PUBLIC_APP_URL=https://your-domain.com` тохируулаад Clerk Dashboard-д ижил domain-ийг нэмнэ.

### Profile зураг (Cloudinary) + Neon database

Profile хуудсанд аватар Cloudinary-д байрлуулж, URL-ийг Neon (User.image) дээр хадгална.

- `.env` дээр нэмнэ:
  - `CLOUDINARY_CLOUD_NAME=your_cloud_name`
  - `CLOUDINARY_API_KEY=your_api_key`
  - `CLOUDINARY_API_SECRET=your_api_secret`
- [Cloudinary Dashboard](https://cloudinary.com/console) → API Keys-аас утгуудыг авна.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
