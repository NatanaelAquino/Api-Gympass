import { PrismaCheckInsRepository } from "@/respositories/prisma/prisma-check-respository"
import { ValidateCheckInUseCase } from "../checkin/validate-check-in"

export function makeValidateCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const validateCheckInUseCase = new ValidateCheckInUseCase(prismaCheckInsRepository)

  return validateCheckInUseCase
}