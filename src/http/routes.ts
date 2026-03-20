import { FastifyInstance } from "fastify"
import { register } from "./controller/resgister"

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
}