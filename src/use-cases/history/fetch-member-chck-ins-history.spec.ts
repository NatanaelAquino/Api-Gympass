import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryCheckinsRepository } from "@/respositories/in-memory/in-memory-checks-ins-respository"
import { FetchMemberCheckInsHistoryUseCase } from "./fetch-member-check-ins-history"


let checkInsRepository: InMemoryCheckinsRepository
let sut: FetchMemberCheckInsHistoryUseCase

describe("fetch member check ins history use case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckinsRepository()
    sut = new FetchMemberCheckInsHistoryUseCase(checkInsRepository)
  })

  it("should be able to fetch member check ins history", async () => {

    await checkInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    })
    await checkInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-02",
    })

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page:1
    })
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" }),
    ])
  })

  it("should be able to fetch paginated check-in history", async () => {

    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        user_id: "user-01",
        gym_id: `gym-${i}`,
      })
    }

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 2,
    })
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ])
  })

})