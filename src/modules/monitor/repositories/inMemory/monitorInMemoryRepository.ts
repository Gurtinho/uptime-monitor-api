import type { IMonitorRepository } from "../iMonitorRepository";
import type { CreateMonitorRequestDTO, MonitorResponseDTO, UpdateMonitorRequestDTO } from "../../dtos/monitorDTO";
import { AppError } from "@/shared/infra/errors/appError";

export class MonitorInMemoryRepository implements IMonitorRepository {
    public readonly monitors: MonitorResponseDTO[] = [];

    async create(id: string, data: CreateMonitorRequestDTO): Promise<MonitorResponseDTO> {
        if (this.monitors.find((monitor) => monitor.url === data.url)) {
            throw new AppError("Monitor already exists", 400);
        }

        const monitor: MonitorResponseDTO = {
            ...data,
            id,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        this.monitors.push(monitor)
        return monitor
    }

    async update(id: string, data: UpdateMonitorRequestDTO): Promise<MonitorResponseDTO> {
        const monitor = this.monitors.find((monitor) => monitor.id === id);
        if (!monitor) {
            throw new AppError("Monitor not found", 404);
        }
        const updatedMonitor: MonitorResponseDTO = {
            ...monitor,
            ...data,
            updatedAt: new Date(),
        }
        this.monitors[this.monitors.indexOf(monitor)] = updatedMonitor
        return updatedMonitor;
    }

    async delete(id: string): Promise<void> {
        const monitor = this.monitors.find((monitor) => monitor.id === id)
        if (!monitor) {
            throw new AppError("Monitor not found", 404);
        }
        this.monitors.splice(this.monitors.indexOf(monitor), 1)
    }

    async findById(id: string): Promise<MonitorResponseDTO | null> {
        const monitor = this.monitors.find((monitor) => monitor.id === id)
        return monitor ?? null
    }

    async findByName(name: string): Promise<MonitorResponseDTO | null> {
        const monitor = this.monitors.find((monitor) => monitor.name === name)
        return monitor ?? null
    }

    async findByUrl(url: string): Promise<MonitorResponseDTO | null> {
        const monitor = this.monitors.find((monitor) => monitor.url === url)
        return monitor ?? null
    }

    async findAll(): Promise<MonitorResponseDTO[]> {
        return this.monitors
    }

}
