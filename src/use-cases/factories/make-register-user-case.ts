import { PrismaUsersRepository } from "@/respositories/prisma/prisma-users-respository"
import { RegisterUseCase } from "../register/register"

export function makeRegisterUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    return registerUseCase
}