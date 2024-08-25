import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RegisterPetUseCase } from '../register-pet'

export function makeRegisterPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const petRegisterUseCase = new RegisterPetUseCase(petsRepository)

  return petRegisterUseCase
}
