import { Router } from "express"
import { MonitorController } from "@/modules/monitor/controllers/monitorController"
import { MonitorUseCase } from "@/modules/monitor/useCases/monitorUseCase"
import { MonitorRepository } from "@/modules/monitor/repositories/monitorRepository"

const monitorRepository = new MonitorRepository()
const monitorUseCase = new MonitorUseCase(monitorRepository)
const monitorController = new MonitorController(monitorUseCase)

export const router = Router()

/**
 * @openapi
 * /health:
 *   get:
 *     description: Health
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/health", (_req, res) => {
  res.send("OK")
})

router.post("/monitor", (req, res) => monitorController.create(req, res))
router.get("/monitor", (req, res) => monitorController.findAll(req, res))
router.get("/monitor/:id", (req, res) => monitorController.findById(req, res))
router.put("/monitor/:id", (req, res) => monitorController.update(req, res))
router.delete("/monitor/:id", (req, res) => monitorController.delete(req, res))
