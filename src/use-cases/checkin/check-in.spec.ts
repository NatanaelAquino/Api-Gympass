import { expect, describe, it, beforeEach, afterEach, vi } from "vitest"
import { InMemoryCheckinsRepository } from "@/respositories/in-memory/in-memory-checks-ins-respository"
import { CheckinUseCase } from "./checkin"
import { InMemoryGymsRepository } from "@/respositories/in-memory/in-memory-gyms-repository"
import { Decimal } from "decimal.js"
import { MaxNumberOfCheckInsError } from "../Errors/max-number-of-check-ins-error"
import { MaxDistanceError } from "../Errors/max-distance-error"


let checkInRepository: InMemoryCheckinsRepository
let sut: CheckinUseCase
let gymasRepository: InMemoryGymsRepository

describe("check in", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckinsRepository()
    gymasRepository = new InMemoryGymsRepository()
    sut = new CheckinUseCase(checkInRepository, gymasRepository)

    await gymasRepository.create({
      id: "gym-01",
      title: "Gym 01",
      description: "Gym 01",
      phone: null,
      latitude: -22.2953022,
      longitude: -45.9118878,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("Check in use Case", async () => {
    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -22.2953022,
      userLongitude: -45.9118878,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  /// red, green, refactor => TDD

  it("should not be able to check in twice", async () => {
    vi.setSystemTime(new Date(2025, 0, 10, 13, 0, 0))
    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -22.2953022,
      userLongitude: -45.9118878,
    })

    await expect(() => sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -22.2953022,
      userLongitude: -45.9118878,
    })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })
  it("should  be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2025, 0, 10, 13, 0, 0))
    await gymasRepository.items.push({
      id: "gym-01",
      title: "Gym 01",
      description: "Gym 01",
      phone: null,
      latitude: new Decimal(-22.2953022),
      longitude: new Decimal(-45.9118878),
    })
    await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -22.2953022,
      userLongitude: -45.9118878,
    })
    vi.setSystemTime(new Date(2025, 0, 11, 13, 0, 0))
    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: -22.2953022,
      userLongitude: -45.9118878,
    })

    expect(checkIn.id).toEqual(expect.any(String))

  })
  //-22.2953022,-45.9118878
  it("should not be able to check in on distant gym", async () => {
    gymasRepository.items.push({
      id: "gym-02",
      title: "Gym 02",
      description: "Gym 02",
      phone: null,
      latitude: new Decimal(-22.2953022),
      longitude: new Decimal(-45.9118878),
    })

    //-22.2283943,-45.9343287

    await expect(() => sut.execute({
      userId: "user-01",
      gymId: "gym-02",
      userLatitude: -22.2283943,
      userLongitude: -45.9343287,
    })).rejects.toBeInstanceOf(MaxDistanceError)
  })
})