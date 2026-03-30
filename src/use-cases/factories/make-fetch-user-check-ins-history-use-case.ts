import { PrismaCheckInsRepository } from "@/respositories/prisma/prisma-check-respository"
import { FetchMemberCheckInsHistoryUseCase } from "../history/fetch-member-check-ins-history"

export function makeFetchUserCheckInsHistoryUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const fetchUserCheckInsHistoryUseCase = new FetchMemberCheckInsHistoryUseCase(prismaCheckInsRepository)

  return fetchUserCheckInsHistoryUseCase
}