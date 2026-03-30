import { CreateGymUseCase } from "../gym/create-gym"
import { PrismaGymsRepository } from "@/respositories/prisma/prisma-gyms-repository"

export function makeCreateGymUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const createGymUseCase = new CreateGymUseCase(prismaGymsRepository)

  return createGymUseCase
} 