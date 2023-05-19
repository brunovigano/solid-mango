import { adaptMiddleware } from '@/main/adapters/express-middleware-adapter'
import { mockAuthMiddleware } from '@/main/factories/middlewares/auth-middleware-factory'

export const auth = adaptMiddleware(mockAuthMiddleware())
