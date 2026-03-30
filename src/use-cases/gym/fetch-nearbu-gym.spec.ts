
import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryGymsRepository } from "@/respositories/in-memory/in-memory-gyms-repository"
import { FetchNearByGymUseCase } from "./fetch-nearbu-gym"


let gymsRepository: InMemoryGymsRepository
let sut: FetchNearByGymUseCase

describe("Fetch nearby gyms use case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearByGymUseCase(gymsRepository)
  })

  //-22.2300601,-45.9338207,21z 
  it("should be able to fetch nearby gyms", async () => {

    await gymsRepository.create({
      title: "Neat Gym",
      description: "Gym 1",
      phone: null,  
      latitude: -22.2300601,
      longitude:-45.9338207,
    })

    await gymsRepository.create({
      title: "Far Gym",
      description: "Gym 2",
      phone: null,
      latitude: -22.2953022,
      longitude: -45.10118878,
    })

    const { gyms } = await sut.execute({
      userLatitude: -22.2300601,
      userLongitude: -45.9338207,
    })  
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Neat Gym" }),
    ])  
  })


})