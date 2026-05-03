import type { CreateMonitorRequestDTO, MonitorResponseDTO, UpdateMonitorRequestDTO } from "../dtos/monitorDTO";

export interface IMonitorRepository {

  create(id: string, data: CreateMonitorRequestDTO): Promise<MonitorResponseDTO>
  update(id: string, data: UpdateMonitorRequestDTO): Promise<MonitorResponseDTO>
  delete(id: string): Promise<void>
  findById(id: string): Promise<MonitorResponseDTO | null>
  findByName(name: string): Promise<MonitorResponseDTO | null>
  findByUrl(url: string): Promise<MonitorResponseDTO | null>
  findAll(): Promise<MonitorResponseDTO[]>

}