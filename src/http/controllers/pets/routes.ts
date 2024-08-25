import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../../middleWares/verify-jwt'
import { register } from './register'
import { verifyOrgRole } from '@/middleWares/verify-org-role'
import { search } from './search'
import { searchUnique } from './search-unique'

export async function petRoutes(app: FastifyInstance) {
  app.get('/pets/unique/:petId', searchUnique)
  app.get('/pets/filter/:city/:feature', search)

  app.post(
    '/pets',
    { onRequest: [verifyJWT, verifyOrgRole('ADMIN')] },
    register,
  )
}
