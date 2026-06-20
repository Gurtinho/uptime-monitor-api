import { cleanDatabase } from "./helpers/db-cleanup"
import { beforeEach } from "vitest"

beforeEach(async () => {
  await cleanDatabase()
})
