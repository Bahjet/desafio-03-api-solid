import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface RegisterOrgRequest {
  name: string
  email: string
  whatsapp: string
  city: string
  password: string
}

interface RegisterOrgResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    city,
    email,
    name,
    password,
    whatsapp,
  }: RegisterOrgRequest): Promise<RegisterOrgResponse> {
    const orgWithSomeEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSomeEmail) {
      throw new OrgAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      city,
      email,
      name,
      password_hash,
      whatsapp,
    })

    return { org }
  }
}
