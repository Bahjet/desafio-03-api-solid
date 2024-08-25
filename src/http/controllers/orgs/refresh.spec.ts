import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Authenticate Use Case', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      name: 'John Doe',
      email: 'johndoeee@example.com',
      whatsapp: '13991955884',
      city: 'santos',
      password: '123456',
    })

    const authResponse = await request(app.server)
      .post('/session')
      .send({ email: 'johndoeee@example.com', password: '123456' })

    const cookie = authResponse.get('Set-Cookie') ?? []

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookie)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
