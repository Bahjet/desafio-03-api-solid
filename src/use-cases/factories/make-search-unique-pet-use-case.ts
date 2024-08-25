import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchUniquePet } from '../search-unique-pet'

export function makeSearchUniquePet() {
  const petsRepository = new PrismaPetsRepository()

  const findUniquePetUseCase = new SearchUniquePet(petsRepository)

  return findUniquePetUseCase
}
