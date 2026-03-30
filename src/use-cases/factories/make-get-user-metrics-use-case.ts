import { PrismaCheckInsRepository } from "@/respositories/prisma/prisma-check-respository"
import { GetUserMetricsUseCase } from "../user/get-user-metrics"

export function makeGetUserMetricsUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)

    return getUserMetricsUseCase
}