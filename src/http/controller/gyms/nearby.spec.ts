import request from 'supertest'
import app from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'

describe('Nearby (e2e)', () => {

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

  it('should be able to search for gyms by nearby', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'John Doe Gym',
        description: 'A gym for everyone',
        phone: '123456789',
        latitude: -22.2300601,
        longitude: -45.9338207,
      })
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'John Doe Gym222',
        description: 'A gym for everyone',
        phone: '123456789',
        latitude: -23.5505,
        longitude: -46.6333,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .query({
        latitude: -22.2300601,
        longitude: -45.9338207,
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'John Doe Gym',

        }),
      ]),
    )
  })
})