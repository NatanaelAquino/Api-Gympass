import { FastifyInstance } from "fastify"
import { verifyJwt } from "../../middlewares/verify-jwt"
import { create } from "./create"
import { search } from "./serarch"
import { nearby } from "./nearby"
import { VerifyUserRole } from "@/http/middlewares/Verify-user-role"

export async function gymRoutes(app: FastifyInstance) {
  app.post('onRequest' ,verifyJwt)

  app.get('/gyms/search', search) 
  app.get('/gyms/nearby', nearby)
  app.post('/gyms',{onRequest: [VerifyUserRole('ADMIN')]}, create)
}