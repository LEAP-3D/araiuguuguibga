-- CreateTable
CREATE TABLE "RescuePost" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "breed" TEXT,
    "age" TEXT,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RescuePost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RescuePost" ADD CONSTRAINT "RescuePost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
