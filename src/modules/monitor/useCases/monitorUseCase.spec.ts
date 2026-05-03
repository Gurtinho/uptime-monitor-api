import { describe, it, expect, beforeEach } from "vitest";
import { MonitorUseCase } from "./monitorUseCase";
import type { IMonitorRepository } from "../repositories/iMonitorRepository";
import { MonitorInMemoryRepository } from "../repositories/inMemory/monitorInMemoryRepository";
import { AppError } from "@/shared/infra/errors/appError";

let monitorRepository: IMonitorRepository
let monitorUseCase: MonitorUseCase

describe("MonitorUseCase", () => {

    beforeEach(() => {
        monitorRepository = new MonitorInMemoryRepository()
        monitorUseCase = new MonitorUseCase(monitorRepository)
    })

    it("should create a monitor", async () => {
        const monitor = await monitorUseCase.create({
            name: "Monitor",
            url: "https://example.com",
            interval: 60 * 60 * 24,
            status: "PAUSED"
        })

        expect(monitor).toHaveProperty("id")
        expect(monitor).toHaveProperty("name", "Monitor")
        expect(monitor).toHaveProperty("url", "https://example.com")
        expect(monitor).toHaveProperty("interval", 60 * 60 * 24)
        expect(monitor).toHaveProperty("status", "PAUSED")
    })

    it("should not create a monitor if it already exists", async () => {
        await monitorUseCase.create({
            name: "Monitor",
            url: "https://example.com",
            interval: 60 * 60 * 24,
            status: "PAUSED"
        })

        await expect(monitorUseCase.create({
            name: "Monitor",
            url: "https://example.com",
            interval: 60 * 60 * 24,
            status: "PAUSED"
        })).rejects.toThrow(new AppError("Monitor already exists"))
    })

    it("should update a monitor", async () => {
        const monitor = await monitorUseCase.create({
            name: "Monitor",
            url: "https://example.com",
            interval: 60 * 60 * 24,
            status: "PAUSED"
        })

        const updatedMonitor = await monitorUseCase.update(monitor.id, {
            name: "Updated Monitor",
            interval: 60 * 60 * 24,
            status: "ACTIVE"
        })

        expect(updatedMonitor).toHaveProperty("id")
        expect(updatedMonitor).toHaveProperty("name", "Updated Monitor")
        expect(updatedMonitor).toHaveProperty("interval", 60 * 60 * 24)
        expect(updatedMonitor).toHaveProperty("status", "ACTIVE")
    })

    it("should update only name", async () => {
        const monitor = await monitorUseCase.create({
            name: "Monitor",
            url: "https://example.com",
            interval: 60 * 60 * 24,
            status: "PAUSED"
        })

        const updatedMonitor = await monitorUseCase.update(monitor.id, {
            name: "Updated Monitor"
        })

        expect(updatedMonitor).toHaveProperty("id", monitor.id)
        expect(updatedMonitor).toHaveProperty("name", "Updated Monitor")
        expect(updatedMonitor).toHaveProperty("interval", 60 * 60 * 24)
        expect(updatedMonitor).toHaveProperty("status", "PAUSED")
    })

    it("should not update a monitor if it does not exist", async () => {
        await expect(monitorUseCase.update("non-existent-id", {
            name: "Updated Monitor"
        })).rejects.toThrow(new AppError("Monitor not found"))
    })

    it("should delete a monitor", async () => {
        const monitor = await monitorUseCase.create({
            name: "Monitor",
            url: "https://example.com",
            interval: 60 * 60 * 24,
            status: "PAUSED"
        })

        await monitorUseCase.delete(monitor.id)

        await expect(monitorUseCase.findById(monitor.id)).rejects.toThrow(new AppError("Monitor not found"))
    })

    it("should not delete a monitor if it does not exist", async () => {
        await expect(monitorUseCase.delete("non-existent-id")).rejects.toThrow(new AppError("Monitor not found"))
    })

    it("should find a monitor by id", async () => {
        const monitor = await monitorUseCase.create({
            name: "Monitor",
            url: "https://example.com",
            interval: 60 * 60 * 24,
            status: "PAUSED"
        })

        const foundMonitor = await monitorUseCase.findById(monitor.id)

        expect(foundMonitor).toHaveProperty("id", monitor.id)
        expect(foundMonitor).toHaveProperty("name", "Monitor")
        expect(foundMonitor).toHaveProperty("url", "https://example.com")
        expect(foundMonitor).toHaveProperty("interval", 60 * 60 * 24)
        expect(foundMonitor).toHaveProperty("status", "PAUSED")
    })

    it("should not find a monitor if it does not exist", async () => {
        await expect(monitorUseCase.findById("non-existent-id")).rejects.toThrow(new AppError("Monitor not found"))
    })

    it("should find all monitors", async () => {
        await monitorUseCase.create({
            name: "Monitor 1",
            url: "https://example.com/monitor-1",
            interval: 60 * 60 * 24,
            status: "PAUSED"
        })

        await monitorUseCase.create({
            name: "Monitor 2",
            url: "https://example.com/monitor-2",
            interval: 60 * 60 * 24,
            status: "PAUSED"
        })

        const monitors = await monitorUseCase.findAll()

        expect(monitors).toHaveLength(2)
    })

    it("should find all monitors and check status", async () => {
        await monitorUseCase.create({
            name: "Monitor 1",
            url: "https://example.com/monitor-1",
            interval: 60 * 60 * 24,
            status: "PAUSED"
        })

        await monitorUseCase.create({
            name: "Monitor 2",
            url: "https://example.com/monitor-2",
            interval: 60 * 60 * 24,
            status: "ACTIVE"
        })

        const monitors = await monitorUseCase.findAll()

        expect(monitors).toHaveLength(2)
        expect(monitors[0]).toHaveProperty("status", "PAUSED")
        expect(monitors[1]).toHaveProperty("status", "ACTIVE")
    })

    it("should find all if none exists", async () => {
        const monitors = await monitorUseCase.findAll()

        expect(monitors).toHaveLength(0)
    })
})