import request from 'supertest'
import app from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'

describe('Check-ins validate (e2e)', () => {

  beforeAll(async () => {
    await app.ready()

    await prisma.user.deleteMany({
      where: {
        email: 'profile@example.com'
      }
    })
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate a Check-in', async () => {
    const { token } = await createAndAuthenticateUser(app, true)
    const gym = await prisma.gym.create({
      data: {
        title: 'John Doe Gym',
        latitude: -23.5505,
        longitude: -46.6333,
      }
    })
    const user = await prisma.user.findFirstOrThrow()

    const checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id
      }
    })
    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send() 

    expect(response.statusCode).toEqual(204)

    const checkInValidated = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      }
    })

    expect(checkInValidated.validated_at).toEqual(expect.any(Date))
  })
})