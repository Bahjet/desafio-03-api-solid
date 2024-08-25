import { makeSearchPetsByCity } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const cityPetParamsSchema = z.object({
    city: z.string(),
    feature: z.string(),
  })

  const { city, feature } = cityPetParamsSchema.parse(request.params)

  const searchPetsUseCase = makeSearchPetsByCity()

  const { pets } = await searchPetsUseCase.execute({ city, feature })

  reply.status(200).send({ pets })
}
