import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryCheckinsRepository } from "@/respositories/in-memory/in-memory-checks-ins-respository"
import { GetUserMetricsUseCase } from "./get-user-metrics"


let useRepository: InMemoryCheckinsRepository
let sut: GetUserMetricsUseCase

describe("Get user metrics", () => {
  beforeEach(() => {
    useRepository = new InMemoryCheckinsRepository()
    sut = new GetUserMetricsUseCase(useRepository)
  })
  it("should be able to get user profile", async () => {

   await useRepository.create({
    user_id: "user-01",
    gym_id: "gym-01",
   }) 

   await useRepository.create({
    user_id: "user-01",
    gym_id: "gym-02",
   })

   const { checkInsCount } = await sut.execute({
    userId: "user-01",
   })

    expect(checkInsCount).toEqual(2)
  })


})