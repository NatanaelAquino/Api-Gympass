import request from 'supertest'
import app from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'

describe('Gyms (e2e)', () => {

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

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'John Doe Gym',
        description: 'A gym for everyone',
        phone: '123456789',
        latitude: -23.5505,
        longitude: -46.6333,
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body.gym).toEqual(
      expect.objectContaining({
        title: 'John Doe Gym',
      }),
    )
  })
})