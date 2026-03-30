import { PrismaUsersRepository } from "@/respositories/prisma/prisma-users-respository"
import { AuthenticateUseCase } from "../authenticate/authenticate"

export function makeAuthenticateUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

    return authenticateUseCase
}