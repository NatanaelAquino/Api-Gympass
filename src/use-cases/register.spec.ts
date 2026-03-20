import {test,expect, describe, it} from "vitest"
import { RegisterUseCase } from "./register"
import { PrismaUsersRepository } from "@/respositories/prisma/prisma-users-respository"

describe("Register", () => {
    it("should has user password upon registration", async () => {

        const prismaUserRespository = new PrismaUsersRepository()
        const registerUSeCase = new RegisterUseCase(prismaUserRespository)

        const {user} = await registerUSeCase.execute({
            name: "John Doe",
            email: "wedit62@gmail.com",
            password: "12345",
        })

        expect(user.password_hash).toEqual(expect.any(String))
    })  
})