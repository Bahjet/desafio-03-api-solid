import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to register', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'John Doe',
      email: 'johndoeee@example.com',
      whatsapp: '13991955884',
      city: 'santos',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
