-- CreateTable
CREATE TABLE "public"."reading_list" (
    "id" SERIAL NOT NULL,
    "bookId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reading_list_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reading_list_userId_bookId_key" ON "public"."reading_list"("userId", "bookId");

-- AddForeignKey
ALTER TABLE "public"."reading_list" ADD CONSTRAINT "reading_list_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
