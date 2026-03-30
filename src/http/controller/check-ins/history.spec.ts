import request from 'supertest'
import app from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'

describe('Check-ins history (e2e)', () => {

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

  it('should be able to get check-ins history', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()
    const gym = await prisma.gym.create({
      data: {
        title: 'John Doe Gym',
        latitude: -23.5505,
        longitude: -46.6333,
      }
    })
    const checkIns = await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id
        },
        {
          gym_id: gym.id,
          user_id: user.id
        },
      ]

    })
    const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toHaveLength(2)
    expect(response.body.checkIns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          gym_id: gym.id,
          user_id: user.id  
        }),
      ]),
    )
  })
})