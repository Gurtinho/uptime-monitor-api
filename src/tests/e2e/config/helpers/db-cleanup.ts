import { prisma } from "../../../../shared/infra/database/database"

export async function cleanDatabase() {
  await prisma.$queryRaw`TRUNCATE TABLE "Monitor" RESTART IDENTITY CASCADE`
}
