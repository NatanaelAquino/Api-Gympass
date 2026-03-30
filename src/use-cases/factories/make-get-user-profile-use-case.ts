import { PrismaUsersRepository } from "@/respositories/prisma/prisma-users-respository"
import { GetUserProfileUseCase } from "../user/get-user-profile"

export function makeGetUserProfileUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository()
    const getUserProfileUseCase = new GetUserProfileUseCase(prismaUsersRepository)

    return getUserProfileUseCase
}