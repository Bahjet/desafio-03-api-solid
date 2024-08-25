import { app } from '@/app'
import request from 'supertest'
import { test, describe, beforeAll, afterAll, expect } from 'vitest'

describe('Register e2e', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  test('register a pet', async () => {
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

    const { token } = authResponse.body

    const petResponse = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Mayla',
        age: 'adulto',
        size: 'pequenina',
        energy_level: '5',
      })

    expect(petResponse.statusCode).toEqual(201)
    expect(petResponse.body.pet).toEqual(
      expect.objectContaining({ name: 'mayla' }),
    )
  })
})
