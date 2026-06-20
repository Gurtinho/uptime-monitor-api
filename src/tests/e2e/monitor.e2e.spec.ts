import request from "supertest"
import { describe, it, expect } from "vitest"
import { app } from "../../shared/infra/http/app"

const BASE_URL = "/monitor"

const monitorPayload = {
  name: "Google",
  url: "https://google.com",
  interval: 30,
}

describe("POST /monitor", () => {
  it("cria um monitor e retorna 201", async () => {
    const res = await request(app).post(BASE_URL).send(monitorPayload)

    expect(res.status).toBe(201)
    expect(res.body).toMatchObject({
      name: "Google",
      url: "https://google.com",
      interval: 30,
      status: "UNVERIFIED",
    })
    expect(res.body.id).toBeDefined()
  })

  it("retorna 400 se URL já existe", async () => {
    await request(app).post(BASE_URL).send(monitorPayload)

    const res = await request(app).post(BASE_URL).send(monitorPayload)

    expect(res.status).toBe(400)
    expect(res.body.message).toBe("Monitor already exists")
  })

  it("retorna 400 se URL é inválida", async () => {
    const res = await request(app)
      .post(BASE_URL)
      .send({ ...monitorPayload, url: "not-a-valid-url" })

    expect(res.status).toBe(400)
    expect(res.body.message).toBe("Invalid URL")
  })
})

describe("GET /monitor", () => {
  it("retorna lista vazia quando não há monitores", async () => {
    const res = await request(app).get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toEqual([])
  })

  it("retorna todos os monitores criados", async () => {
    await request(app).post(BASE_URL).send(monitorPayload)
    await request(app)
      .post(BASE_URL)
      .send({ ...monitorPayload, name: "Github", url: "https://github.com" })

    const res = await request(app).get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(2)
  })
})

describe("GET /monitor/:id", () => {
  it("retorna o monitor pelo id", async () => {
    const created = await request(app).post(BASE_URL).send(monitorPayload)
    const { id } = created.body as { id: string }

    const res = await request(app).get(`${BASE_URL}/${id}`)

    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({ id, url: "https://google.com" })
  })

  it("retorna 400 se monitor não existe", async () => {
    const res = await request(app).get(`${BASE_URL}/id-inexistente`)

    expect(res.status).toBe(400)
    expect(res.body.message).toBe("Monitor not found")
  })
})

describe("PUT /monitor/:id", () => {
  it("atualiza o monitor e retorna 200", async () => {
    const created = await request(app).post(BASE_URL).send(monitorPayload)
    const { id } = created.body as { id: string }

    const res = await request(app)
      .put(`${BASE_URL}/${id}`)
      .send({ name: "Google Updated", interval: 60 })

    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({ id, name: "Google Updated", interval: 60 })
  })

  it("retorna 400 se monitor não existe", async () => {
    const res = await request(app).put(`${BASE_URL}/id-inexistente`).send({ name: "Qualquer" })

    expect(res.status).toBe(400)
    expect(res.body.message).toBe("Monitor not found")
  })
})

describe("DELETE /monitor/:id", () => {
  it("deleta o monitor e retorna 204", async () => {
    const created = await request(app).post(BASE_URL).send(monitorPayload)
    const { id } = created.body as { id: string }

    const res = await request(app).delete(`${BASE_URL}/${id}`)

    expect(res.status).toBe(204)
  })

  it("confirma que monitor não existe após deletar", async () => {
    const created = await request(app).post(BASE_URL).send(monitorPayload)
    const { id } = created.body as { id: string }

    await request(app).delete(`${BASE_URL}/${id}`)

    const res = await request(app).get(`${BASE_URL}/${id}`)
    expect(res.status).toBe(400)
  })

  it("retorna 400 se monitor não existe", async () => {
    const res = await request(app).delete(`${BASE_URL}/id-inexistente`)

    expect(res.status).toBe(400)
    expect(res.body.message).toBe("Monitor not found")
  })
})
