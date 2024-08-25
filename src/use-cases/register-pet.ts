import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
interface RegisterPetRequest {
  name: string
  age: string
  size: string
  energy_level: string
  orgId: string
}

interface RegisterPetResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    energy_level,
    name,
    size,
    orgId,
  }: RegisterPetRequest): Promise<RegisterPetResponse> {
    const pet = await this.petsRepository.create({
      age,
      energy_level,
      name,
      size,
      org_id: orgId,
    })

    return { pet }
  }
}
