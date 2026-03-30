import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryUsersRepository } from "@/respositories/in-memory/in-memory-user-respositories"
import { AuthenticateUseCase } from "./authenticate"
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from "../Errors/invalid-credentials-error"


let useRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe("Authenticate", () => {
  beforeEach(() => {
    useRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(useRepository)
  })
  it("should be able to Authenticate", async () => {

    await useRepository.create({
      name: "John Doe",
      email: "teste0@gmail.com",
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      email: "teste0@gmail.com",
      password: "123456",
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it("should be able to Authenticate with wrong email", async () => {
    await expect(() => sut.execute({
      email: "teste2@gmail.com",
      password: "123456",
    })).rejects.toBeInstanceOf(InvalidCredentialsError)

  })

})