import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryUsersRepository } from "@/respositories/in-memory/in-memory-user-respositories"
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from "./get-user-profile"
import { ResourceNotFoundError } from "../Errors/resource-not-found-error"


let useRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe("Authenticate", () => {
  beforeEach(() => {
    useRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(useRepository)
  })
  it("should be able to get user profile", async () => {

    const createdUser = await useRepository.create({
      name: "John Doe",
      email: "teste0@gmail.com",
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(createdUser.id)
  })

  it("should be able to get user profile with wrong id", async () => {
    await expect(() => sut.execute({
      userId: "not-exit-id",
    })).rejects.toBeInstanceOf(ResourceNotFoundError)

  })

})