import { test, describe, expect, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemmoryOrgsRepository } from '@/in-memory/in-memory-orgs-repository'
import { RegisterOrgUseCase } from './register'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgUseCaseRepository: InMemmoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgUseCaseRepository = new InMemmoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgUseCaseRepository)
  })

  test('should be able to register', async () => {
    const { org } = await sut.execute({
      name: 'Pet Feliz',
      email: 'petfedfdsfsgffgljgfjgdsdlklksisgdfgfdz@gmail.com',
      whatsapp: '13954488568',
      city: 'santos',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  test('should hash user password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Pet Feliz',
      email: 'petfedfdsfsgffgljgfjgdsdlklksisgdfgfdz@gmail.com',
      whatsapp: '13954488568',
      city: 'santos',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  test('should not be able ro register with same email twice', async () => {
    await sut.execute({
      name: 'Pet Feliz',
      email: 'emailIgual@gmail.com',
      whatsapp: '13954488568',
      city: 'santos',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Pet Feliz',
        email: 'emailIgual@gmail.com',
        whatsapp: '13954488568',
        city: 'santos',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
