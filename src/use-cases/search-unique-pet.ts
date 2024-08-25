import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PetNotFound } from './errors/pet-not-found'

interface SearchPetRequest {
  id: string
}

interface SearchPetResponse {
  pet: Pet | string
}

export class SearchUniquePet {
  constructor(private petRepository: PetsRepository) {}

  async execute({ id }: SearchPetRequest): Promise<SearchPetResponse> {
    const pet = await this.petRepository.findUniquePet(id)

    if (pet === null) {
      throw new PetNotFound()
    }

    return { pet }
  }
}
