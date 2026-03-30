
import { expect, describe, it, beforeEach, afterEach, vi } from "vitest"
import { InMemoryCheckinsRepository } from "@/respositories/in-memory/in-memory-checks-ins-respository"
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from "../Errors/resource-not-found-error"
import { LateCheckInValidationError } from "../Errors/late-check-in-validation-error"

let checkInRepository: InMemoryCheckinsRepository
let sut: ValidateCheckInUseCase

describe("check in", () => {

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckinsRepository()
    sut = new ValidateCheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("Should be able to validate check in", async () => {
    const createdCheckIn = await checkInRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    })
    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })
    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it("Should not be able to validate an inexisting check in", async () => {
    await expect(() => sut.execute({
      checkInId: "inexisting-check-in-id",
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it("Should not be able to validate an check in after 20 minutes", async () => {
    vi.setSystemTime(new Date(2025, 0, 10, 13, 40))

    const createdCheckIn = await checkInRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    })
    const twentyOneMinutesInMs = 1000 * 60 * 21
    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() => sut.execute({
      checkInId: createdCheckIn.id,
    })).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})