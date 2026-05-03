import { describe, expect, it, beforeEach } from "vitest"
import type { IMonitorRepository } from "./iMonitorRepository"
import { MonitorInMemoryRepository } from "./inMemory/monitorInMemoryRepository"
import { randomUUID } from "crypto"
import type { MonitorResponseDTO } from "../dtos/monitorDTO"

let monitorInMemoryRepository: IMonitorRepository
let id: string
let monitor: {
    name: string
    url: string
    interval: number
    status: "online" | "offline"
}
let createdMonitor: MonitorResponseDTO

describe('Monitor Repository', () => {

    beforeEach(async () => {
        monitorInMemoryRepository = new MonitorInMemoryRepository()

        // Create a new monitor before each test
        id = randomUUID()
        monitor = {
            name: "Monitor 1",
            url: "https://google.com",
            interval: 5,
            status: "online"
        }
        createdMonitor = await monitorInMemoryRepository.create(id, monitor)
    })

    it("should create a monitor", async () => {
        expect(createdMonitor).toBeDefined()
        expect(createdMonitor.id).toBe(id)
        expect(createdMonitor.name).toBe("Monitor 1")
        expect(createdMonitor.url).toBe("https://google.com")
        expect(createdMonitor.interval).toBe(5)
    })

    it("should not create a monitor if the url already exists", async () => {
        await expect(monitorInMemoryRepository.create(id, monitor)).rejects.toThrow("Monitor already exists")
    })

    it("should find a monitor by id", async () => {
        const foundMonitor = await monitorInMemoryRepository.findById(id)

        expect(foundMonitor).toBeDefined()
        expect(foundMonitor?.id).toBe(id)
        expect(foundMonitor?.name).toBe("Monitor 1")
        expect(foundMonitor?.url).toBe("https://google.com")
        expect(foundMonitor?.interval).toBe(5)
    })

    it("should not find a monitor by id if it does not exist", async () => {
        const foundMonitor = await monitorInMemoryRepository.findById("invalid-id")

        expect(foundMonitor).toBeNull()
    })

    it("should find a monitor by url", async () => {
        const foundMonitor = await monitorInMemoryRepository.findByUrl("https://google.com")

        expect(foundMonitor).toBeDefined()
        expect(foundMonitor?.id).toBe(id)
        expect(foundMonitor?.name).toBe("Monitor 1")
        expect(foundMonitor?.url).toBe("https://google.com")
        expect(foundMonitor?.interval).toBe(5)
    })

    it("should not find a monitor by url if it does not exist", async () => {
        const foundMonitor = await monitorInMemoryRepository.findByUrl("invalid-url")

        expect(foundMonitor).toBeNull()
    })

    it("should find a monitor by name", async () => {
        const foundMonitor = await monitorInMemoryRepository.findByName("Monitor 1")

        expect(foundMonitor).toBeDefined()
        expect(foundMonitor?.id).toBe(id)
        expect(foundMonitor?.name).toBe("Monitor 1")
        expect(foundMonitor?.url).toBe("https://google.com")
        expect(foundMonitor?.interval).toBe(5)
    })

    it("should not find a monitor by name if it does not exist", async () => {
        const foundMonitor = await monitorInMemoryRepository.findByName("invalid-name")

        expect(foundMonitor).toBeNull()
    })

    it("should find all monitors", async () => {
        const monitors = await monitorInMemoryRepository.findAll()

        expect(monitors).toBeDefined()
        expect(monitors.length).toBe(1)
        expect(monitors[0]).toBeDefined()
        expect(monitors[0]?.id).toBe(id)
        expect(monitors[0]?.name).toBe("Monitor 1")
        expect(monitors[0]?.url).toBe("https://google.com")
        expect(monitors[0]?.interval).toBe(5)
    })

    it("should not find all monitors if there are no monitors", async () => {
        await monitorInMemoryRepository.delete(id)

        const monitors = await monitorInMemoryRepository.findAll()

        expect(monitors).toBeDefined()
        expect(monitors.length).toBe(0)
    })

    it("should update a monitor successfully", async () => {
        const updateData = {
            id,
            name: "Updated Monitor",
            url: "https://updated.com"
        }

        const updatedMonitor = await monitorInMemoryRepository.update(id, updateData)

        expect(updatedMonitor).toBeDefined()
        expect(updatedMonitor.name).toBe("Updated Monitor")
        expect(updatedMonitor.url).toBe("https://updated.com")
        expect(updatedMonitor.updatedAt.getTime()).toBeGreaterThanOrEqual(createdMonitor.createdAt.getTime())
    })

    it("should not update a monitor if it does not exist", async () => {
        const updateData = {
            id: "invalid-id",
            name: "Updated Monitor",
        }

        await expect(monitorInMemoryRepository.update("invalid-id", updateData)).rejects.toThrow("Monitor not found")
    })

    it("should not delete a monitor if it does not exist", async () => {
        await expect(monitorInMemoryRepository.delete("invalid-id")).rejects.toThrow("Monitor not found")
    })

})