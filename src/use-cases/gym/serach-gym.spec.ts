import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryGymsRepository } from "@/respositories/in-memory/in-memory-gyms-repository"
import { SearchGymUseCase } from "./serach-gym"


let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe("search gym use case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it("should be able to search for gyms by title", async () => {

    for(let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Gym ${i}`,
        description: `Gym ${i}`,
        phone: null,
        latitude: -22.2953022,
        longitude: -45.9118878,
      })
    }

    const { gyms } = await sut.execute({
      query: "Gym",
      page: 2,
    })  
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Gym 21" }),
      expect.objectContaining({ title: "Gym 22" }),
    ])  
  })


})