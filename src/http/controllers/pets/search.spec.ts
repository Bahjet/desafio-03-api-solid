import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

describe('Search Pets (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  test('it should be able to seatch pets by city', async () => {
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

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Mayla',
        age: 'adulto',
        size: 'pequenina',
        energy_level: '5',
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Boby',
        age: 'adulto',
        size: 'pequenina',
        energy_level: '10',
      })

    const petsResponse = await request(app.server).get(
      `/pets/filter/${'santos'}/`,
    )

    const { pets } = petsResponse.body

    expect(pets).toHaveLength(2)
  })
})
