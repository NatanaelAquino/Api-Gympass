import { FetchNearByGymUseCase } from "../gym/fetch-nearbu-gym"
import { PrismaGymsRepository } from "@/respositories/prisma/prisma-gyms-repository"

export function makeFetchNearbyGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const fetchNearbyGymsUseCase = new FetchNearByGymUseCase(prismaGymsRepository)

  return fetchNearbyGymsUseCase
}