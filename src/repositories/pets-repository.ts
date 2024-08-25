import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>

  findManyPetsByCityAndFeature(city: string, feature: string): Promise<Pet[]>

  findUniquePet(id: string): Promise<Pet | null>
}
