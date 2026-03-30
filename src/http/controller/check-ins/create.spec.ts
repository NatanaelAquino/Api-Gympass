import request from 'supertest'
import app from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'

describe('Check-ins (e2e)', () => {

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

  it('should be able to create a Check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const gym = await prisma.gym.create({
      data: {
        title: 'John Doe Gym',
        latitude: -23.5505,
        longitude: -46.6333,
      }
    })
    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        latitude: -23.5505,
        longitude: -46.6333,
      })

    expect(response.statusCode).toEqual(201)
  })
})