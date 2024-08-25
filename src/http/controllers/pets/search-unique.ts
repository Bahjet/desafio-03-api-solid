import { PetNotFound } from '@/use-cases/errors/pet-not-found'
import { makeSearchUniquePet } from '@/use-cases/factories/make-search-unique-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchUnique(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const uniquePetParamSchema = z.object({
    petId: z.string(),
  })

  const { petId } = uniquePetParamSchema.parse(request.params)

  try {
    const searchUniquePet = makeSearchUniquePet()

    const { pet } = await searchUniquePet.execute({ id: petId })

    reply.status(200).send({ pet })
  } catch (err) {
    if (err instanceof PetNotFound) {
      reply.status(204).send({ message: err.message })
    }

    throw err
  }
}
