-- Add status column to RescuePost (run this manually if db push fails)
ALTER TABLE "RescuePost" ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'lost';
