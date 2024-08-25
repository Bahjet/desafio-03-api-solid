import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    whatsapp: z.string(),
    city: z.string(),
    password: z.string().min(6),
  })

  const { city, email, name, password, whatsapp } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerOrgUseCase = makeRegisterOrgUseCase()

    await registerOrgUseCase.execute({
      city,
      email,
      name,
      password,
      whatsapp,
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err // internal server error code 500 fastify tem tratavida de erros internos
  }
  return reply.status(201).send('success')
}
