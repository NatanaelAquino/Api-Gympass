import { PrismaGymsRepository } from "@/respositories/prisma/prisma-gyms-repository"
import { SearchGymUseCase } from "../gym/serach-gym"   

export function makeSearchGymsUseCase () {
  const prismaGymsRepository = new PrismaGymsRepository()
  const searchGymUseCase = new SearchGymUseCase(prismaGymsRepository)

  return searchGymUseCase
}