import type { Request, Response } from "express"
import { MonitorUseCase } from "../useCases/monitorUseCase"
import { StatusEnum } from "../dtos/monitorDTO"

export class MonitorController {
  constructor(private readonly monitorUseCase: MonitorUseCase) {}

  async create(req: Request, res: Response) {
    const { name, url, interval } = req.body as { name: string; url: string; interval: number }
    const monitor = await this.monitorUseCase.create({
      name,
      url,
      interval,
      status: StatusEnum.UNVERIFIED,
    })
    return res.status(201).json(monitor)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params as { id: string }
    const monitor = await this.monitorUseCase.update(id, req.body as Record<string, unknown>)
    return res.status(200).json(monitor)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params as { id: string }
    await this.monitorUseCase.delete(id)
    return res.status(204).send()
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params as { id: string }
    const monitor = await this.monitorUseCase.findById(id)
    return res.status(200).json(monitor)
  }

  async findAll(_req: Request, res: Response) {
    const monitors = await this.monitorUseCase.findAll()
    return res.status(200).json(monitors)
  }
}
