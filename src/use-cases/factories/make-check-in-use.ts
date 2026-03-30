import { PrismaCheckInsRepository } from "@/respositories/prisma/prisma-check-respository"
import { PrismaGymsRepository } from "@/respositories/prisma/prisma-gyms-repository"
import { CheckinUseCase } from "../checkin/checkin"

export function makeCheckInUseCase( ) {
    const prismaCheckInsRepository = new PrismaCheckInsRepository()
    const prismaGymsRepository = new PrismaGymsRepository()
    const checkInUseCase = new CheckinUseCase(prismaCheckInsRepository, prismaGymsRepository)

    return checkInUseCase
}