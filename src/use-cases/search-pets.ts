import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface SearchPetsRequest {
  city: string
  feature: string
}

interface SearchPetsResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private orgRepository: PetsRepository) {}

  async execute({
    city,
    feature,
  }: SearchPetsRequest): Promise<SearchPetsResponse> {
    const pets = await this.orgRepository.findManyPetsByCityAndFeature(
      city.toLowerCase(),
      feature.toLowerCase(),
    )

    return { pets }
  }
}
