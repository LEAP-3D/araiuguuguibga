-- Run this once in Neon SQL Editor if "prisma migrate deploy" fails with P3005.
-- Creates FcmToken table for 12:00 medical reminder push.

CREATE TABLE IF NOT EXISTS "FcmToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FcmToken_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "FcmToken_userId_token_key" ON "FcmToken"("userId", "token");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'FcmToken_userId_fkey'
  ) THEN
    ALTER TABLE "FcmToken" ADD CONSTRAINT "FcmToken_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;
