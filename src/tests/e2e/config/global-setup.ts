import { config } from "dotenv"
import { execSync } from "child_process"
import net from "net"
import { prisma } from "../../../shared/infra/database/database"

export async function setup() {
  config({ path: ".env.test" })

  execSync("yarn prisma migrate deploy", {
    env: { ...process.env },
    stdio: "inherit",
  })
}

export async function teardown() {
  await prisma.$disconnect()
}
