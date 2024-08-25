import { test, describe, expect, beforeEach } from 'vitest'
import { InMemmoryOrgsRepository } from '@/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/org-invalid-credentias-error'

let orgUseCaseRepository: InMemmoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgUseCaseRepository = new InMemmoryOrgsRepository()
    sut = new AuthenticateUseCase(orgUseCaseRepository)
  })

  test('should be able to authenticate', async () => {
    await orgUseCaseRepository.create({
      name: 'Pet Feliz',
      email: 'petfedfdsfsgffgljgfjgdsdlklksisgdfgfdz@gmail.com',
      whatsapp: '13954488568',
      city: 'santos',
      password_hash: await hash('123456', 6),
    })

    const { org } = await sut.execute({
      email: 'petfedfdsfsgffgljgfjgdsdlklksisgdfgfdz@gmail.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  test('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'petfedfdsfsgffgljgfjgdsdlklksisgdfgfdz@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  test('should not be able to authenticate with wrong password', async () => {
    await orgUseCaseRepository.create({
      name: 'Pet Feliz',
      email: 'petfedfdsfsgffgljgfjgdsdlklksisgdfgfdz@gmail.com',
      whatsapp: '13954488568',
      city: 'santos',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'petfedfdsfsgffgljgfjgdsdlklksisgdfgfdz@gmail.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
