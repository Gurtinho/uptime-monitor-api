export enum StatusEnum {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
  UNVERIFIED = "UNVERIFIED",
}

export interface CreateMonitorRequestDTO {
  name: string
  url: string
  interval: number
  status: StatusEnum
  lastCheck?: Date
  createdAt?: Date
}

export interface UpdateMonitorRequestDTO {
  name?: string
  url?: string
  interval?: number
  status?: StatusEnum
  lastCheck?: Date
  updatedAt?: Date
}

export interface MonitorResponseDTO {
  id: string
  name: string
  url: string
  interval: number
  status: string
  lastCheck?: Date
  createdAt: Date
  updatedAt: Date
}
