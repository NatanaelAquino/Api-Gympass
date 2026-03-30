import request from 'supertest'
import app  from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma' 

describe('register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
    
    await prisma.user.deleteMany({
      where: {
        email: 'wedit6@gmail.com'
      }
    })
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: "Natanael",
        email: "register@example.com",
        password: "123456"
      })

    expect(response.statusCode).toEqual(201)
  })
})