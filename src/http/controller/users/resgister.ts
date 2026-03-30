import { FastifyRequest, FastifyReply } from "fastify"
import z from "zod"
import { UserAlreadyExistsError } from "@/use-cases/Errors/user.already-exists"
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-user-case"

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  })

  const { name, email, password } = createUserBodySchema.parse(request.body)

  try {
    const useCase = makeRegisterUseCase()

    await useCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()

}