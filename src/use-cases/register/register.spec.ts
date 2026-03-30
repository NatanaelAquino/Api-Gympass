import { test, expect, describe, it, beforeEach } from "vitest"
import { RegisterUseCase } from "./register"
import { compare } from "bcryptjs"
import { InMemoryUsersRepository } from "@/respositories/in-memory/in-memory-user-respositories"
import { UserAlreadyExistsError } from "../Errors/user.already-exists"

let useRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe("Register", () => {

    beforeEach(() => {
        useRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(useRepository)
    })

    it("should be able to register", async () => {
        const { user } = await sut.execute({
            name: "John Doe",
            email: "teste0@gmail.com",
            password: "12345",
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it("should has user password upon registration", async () => {
        const { user } = await sut.execute({
            name: "John Doe",
            email: "teste1@gmail.com",
            password: "12345",
        })
        const isPassowrdCorrectLyHashed = await compare('12345', user.password_hash)
        expect(isPassowrdCorrectLyHashed).toEqual(true)
    })
    it("should not be able to register with same emial twice", async () => {
        const email = "teste2@gmail.com"
        await sut.execute({
            name: "John Doe",
            email,
            password: "12345",
        })
        await expect(() => sut.execute({
            name: "John Doe",
            email,
            password: "12345",
        })).rejects.toBeInstanceOf(UserAlreadyExistsError)

    })
})