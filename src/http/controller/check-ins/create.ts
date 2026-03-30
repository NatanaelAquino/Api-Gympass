import { FastifyRequest, FastifyReply } from "fastify"
import z from "zod"
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gyms-use"
import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use"

export async function create(request: FastifyRequest, reply: FastifyReply) {

  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })
  const createCheckInBodySchema = z.object({
    latitude: z.coerce.number().refine(
      (value) => {
        return value >= -90 && value <= 90
      }
    ),
    longitude: z.coerce.number().refine(
      (value) => {
        return value >= -180 && value <= 180
      }
    ),
  })
  const {  latitude, longitude } = createCheckInBodySchema.parse(request.body)
  const { gymId } = createCheckInParamsSchema.parse(request.params)

  const checkInUseCase = makeCheckInUseCase()

  await checkInUseCase.execute({  userLatitude: latitude, userLongitude: longitude, gymId, userId: request.user.sub })


  return reply.status(201).send()

}