import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const requestPetBodySchema = z.object({
    name: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
  })

  const { name, age, size, energy_level } = requestPetBodySchema.parse(
    request.body,
  )

  const registerPetUseCase = makeRegisterPetUseCase()

  const { pet } = await registerPetUseCase.execute({
    age: age.toLowerCase(),
    energy_level,
    name: name.toLowerCase(),
    orgId: request.user.sub,
    size: size.toLowerCase(),
  })

  reply.status(201).send({ pet })
}
