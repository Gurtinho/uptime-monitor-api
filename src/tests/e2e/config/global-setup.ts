import { config } from "dotenv"
import { execSync } from "child_process"
import net from "net"
import { prisma } from "../../../shared/infra/database/database"

async function waitForDatabase(host: string, port: number, retries = 30, delayMs = 500) {
  for (let i = 0; i < retries; i++) {
    const ready = await new Promise<boolean>((resolve) => {
      const socket = net.createConnection({ host, port }, () => {
        socket.destroy()
        resolve(true)
      })
      socket.on("error", () => resolve(false))
    })
    if (ready) return
    await new Promise((resolve) => setTimeout(resolve, delayMs))
  }
  throw new Error(`Database not ready at ${host}:${port} after ${retries} retries`)
}

export async function setup() {
  config({ path: ".env.test" })

  const url = new URL(process.env["DATABASE_URL"]!)
  await waitForDatabase(url.hostname, Number(url.port))

  execSync("yarn prisma migrate deploy", {
    env: { ...process.env },
    stdio: "inherit",
  })
}

export async function teardown() {
  await prisma.$disconnect()
}
