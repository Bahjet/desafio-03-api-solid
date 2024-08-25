import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Search unique pet (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  test('should be able to search a unique pet by id', async () => {
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

    const petCreated = petResponse.body

    const petsResponse = await request(app.server).get(
      `/pets/unique/${petCreated.pet.id}`,
    )

    expect(petsResponse.statusCode).toEqual(200)
  })
})
