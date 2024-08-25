import { InMemmoryPetsRepository } from '@/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, test } from 'vitest'
import { SearchUniquePet } from './search-unique-pet'
import { RegisterPetUseCase } from './register-pet'
import { randomUUID } from 'crypto'

let petRepository: InMemmoryPetsRepository
let searchUniquePetUseCase: SearchUniquePet
let registerPetUseCase: RegisterPetUseCase

describe('Search Unique Pet Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemmoryPetsRepository()
    registerPetUseCase = new RegisterPetUseCase(petRepository)
    searchUniquePetUseCase = new SearchUniquePet(petRepository)
  })

  test('search a unique pet by id', async () => {
    const thePet = await registerPetUseCase.execute({
      age: 'adulto',
      energy_level: '5',
      name: 'Boby',
      orgId: randomUUID(),
      size: 'pequenino',
    })

    const { pet } = await searchUniquePetUseCase.execute({ id: thePet.pet.id })
    expect(pet).toEqual(thePet.pet)
  })
})
