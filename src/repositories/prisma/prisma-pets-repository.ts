import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })

    return pet
  }

  async findManyPetsByCityAndFeature(city: string, feature: string) {
    const pets = await prisma.pet.findMany({
      where: {
        org: { city },
        AND: [
          {
            OR: [
              { name: { contains: feature } },
              { about: { contains: feature } },
              { age: { contains: feature } },
              { size: { contains: feature } },
              { energy_level: { contains: feature } },
              { environment: { contains: feature } },
            ],
          },
        ],
      },
    })

    return pets
  }

  async findUniquePet(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: { org: { select: { whatsapp: true } } },
    })

    return pet
  }
}
