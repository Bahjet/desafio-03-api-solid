import { InMemmoryPetsRepository } from '@/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, test } from 'vitest'
import { RegisterPetUseCase } from './register-pet'
import { randomUUID } from 'crypto'

let petUseCaseRepository: InMemmoryPetsRepository
let sut: RegisterPetUseCase

describe('Register pet Use Case', () => {
  beforeEach(() => {
    petUseCaseRepository = new InMemmoryPetsRepository()
    sut = new RegisterPetUseCase(petUseCaseRepository)
  })

  test('should be able to register a pet', async () => {
    const { pet } = await sut.execute({
      age: 'adulto',
      energy_level: '5',
      name: 'Mayla',
      orgId: randomUUID(),
      size: 'pequenino',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
