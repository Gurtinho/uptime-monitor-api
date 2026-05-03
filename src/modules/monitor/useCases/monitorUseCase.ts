import { AppError } from "@/shared/infra/errors/appError";
import type { CreateMonitorRequestDTO, UpdateMonitorRequestDTO } from "../dtos/monitorDTO";
import type { IMonitorRepository } from "../repositories/iMonitorRepository";
import { randomUUID } from "node:crypto";

export class MonitorUseCase {
    constructor(private readonly monitorRepository: IMonitorRepository) {}

    async create(data: CreateMonitorRequestDTO) {
        const exists = await this.monitorRepository.findByUrl(data.url)
        if (exists) {
            throw new AppError('Monitor already exists')
        }
        
        const id = randomUUID()

        const monitor = await this.monitorRepository.create(id, data)
        return monitor
    }

    async update(id: string, data: UpdateMonitorRequestDTO) {
        const exists = await this.monitorRepository.findById(id)
        if (!exists) {
            throw new AppError("Monitor not found")
        }

        const monitor = await this.monitorRepository.update(id, data)
        return monitor
    }

    async delete(id: string) {
        const exists = await this.monitorRepository.findById(id)
        if (!exists) {
            throw new AppError("Monitor not found")
        }

        await this.monitorRepository.delete(id)
    }

    async findById(id: string) {
        const exists = await this.monitorRepository.findById(id)
        if (!exists) {
            throw new AppError("Monitor not found")
        }
        return exists
    }

    async findAll() {
        return await this.monitorRepository.findAll()
    }

    
}