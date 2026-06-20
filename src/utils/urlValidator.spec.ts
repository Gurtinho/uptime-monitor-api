import { describe, it, expect } from "vitest"
import { urlValidator } from "./urlValidator"

describe("URL Validator", () => {
  it("Deve validar uma URL válida", () => {
    const url = "https://example.com"
    expect(urlValidator(url)).toBe(true)
  })

  it("Deve validar uma URL inválida", () => {
    const url = "invalid-url"
    expect(urlValidator(url)).toBe(false)
  })
})
