import { PetsRepository } from '@/repositories/pets-repository'
import { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemmoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      age: data.age,
      energy_level: data.energy_level,
      id: randomUUID(),
      name: data.name,
      org_id: data.org_id,
      size: data.size,
      about: 'sobre',
      environment: 'local grande',
    }

    this.items.push(pet)

    return pet
  }

  async findManyPetsByCityAndFeature(_city: string, feature: string) {
    const pets = this.items.filter(
      (item) =>
        item.name.includes(feature) ||
        item.about?.includes(feature) ||
        item.age.includes(feature) ||
        item.size.includes(feature) ||
        item.energy_level.includes(feature) ||
        item.environment?.includes(feature),
    )

    return pets
  }

  async findUniquePet(id: string) {
    const pet = this.items.find((items) => items.id === id)

    if (!pet) {
      return null
    }

    return pet
  }
}
