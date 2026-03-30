import fastify from 'fastify'
import { userRoutes } from './http/controller/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { gymRoutes } from './http/controller/gyms/routes'
import { checkInsRoutes } from './http/controller/check-ins/routes'
import fastifyCookie from '@fastify/cookie'
const app = fastify()

app.register(fastifyJwt,
  {
    secret: env.JWT_SECRET,
    cookie: {
      cookieName: 'refreshToken',
      signed: false,
    },
    sign: {
      expiresIn: '10m',
    }
  }
)

app.register(fastifyCookie)

app.register(userRoutes)
app.register(gymRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'validation error', issues: error.format() })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    /// TODO: enviar para um serviço de monitoramento de erros DataDog/ NewRelic/Sentry 
  }
  return reply.status(500).send({ message: 'internal server error' })
})
export default app
