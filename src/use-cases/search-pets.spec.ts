import { beforeEach, describe, expect, test } from 'vitest'
import { SearchPetsUseCase } from './search-pets'
import { InMemmoryPetsRepository } from '@/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet'
import { randomUUID } from 'crypto'

let petsRepository: InMemmoryPetsRepository
let registerPetUseCase: RegisterPetUseCase
let searchPetsUseCase: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemmoryPetsRepository()
    registerPetUseCase = new RegisterPetUseCase(petsRepository)
    searchPetsUseCase = new SearchPetsUseCase(petsRepository)
  })

  test('search many pets by features', async () => {
    await registerPetUseCase.execute({
      age: 'adulto',
      energy_level: '5',
      name: 'Boby',
      orgId: randomUUID(),
      size: 'pequenino',
    })

    await registerPetUseCase.execute({
      age: 'adulto',
      energy_level: '5',
      name: 'Mayla',
      orgId: randomUUID(),
      size: 'pequenino',
    })

    const { pets } = await searchPetsUseCase.execute({
      city: '',
      feature: 'adulto',
    })

    expect(pets).toHaveLength(2)
  })
})
