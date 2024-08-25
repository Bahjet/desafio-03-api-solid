import { OrgsRepository } from '@/repositories/orgs-repository'
import { Prisma, Org, $Enums } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemmoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      author_name: 'data.author_name',
      email: data.email,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
      cep: 'data.cep',
      state: 'data.state',
      city: data.city,
      street: 'data.street',
      role: $Enums.Role.ADMIN,
    }

    this.items.push(org)

    return org
  }
}
