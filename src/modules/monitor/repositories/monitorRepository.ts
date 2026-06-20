import { prisma } from "@/shared/infra/database/database"
import type { IMonitorRepository } from "./iMonitorRepository"
import type {
  CreateMonitorRequestDTO,
  MonitorResponseDTO,
  UpdateMonitorRequestDTO,
} from "../dtos/monitorDTO"

export class MonitorRepository implements IMonitorRepository {
  async create(id: string, data: CreateMonitorRequestDTO): Promise<MonitorResponseDTO> {
    return prisma.monitor.create({
      data: { id, ...data },
    })
  }

  async update(id: string, data: UpdateMonitorRequestDTO): Promise<MonitorResponseDTO> {
    return prisma.monitor.update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.monitor.delete({ where: { id } })
  }

  async findById(id: string): Promise<MonitorResponseDTO | null> {
    return prisma.monitor.findUnique({ where: { id } })
  }

  async findByName(name: string): Promise<MonitorResponseDTO | null> {
    return prisma.monitor.findFirst({ where: { name } })
  }

  async findByUrl(url: string): Promise<MonitorResponseDTO | null> {
    return prisma.monitor.findUnique({ where: { url } })
  }

  async findAll(): Promise<MonitorResponseDTO[]> {
    return prisma.monitor.findMany()
  }
}
