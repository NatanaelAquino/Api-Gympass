import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryGymsRepository } from "@/respositories/in-memory/in-memory-gyms-repository"
import { CreateGymUseCase } from "./create-gym"


let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe("create gym use case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "Gym 01",
      description: "Gym 01",
      phone: null,
      latitude: -22.2953022,
      longitude: -45.9118878,
    })
    expect(gym.id).toEqual(expect.any(String))
  })


})