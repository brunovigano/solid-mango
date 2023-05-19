import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { Middleware } from '@/presentation/protocols'
import { mockDbLoadAccountByToken } from '@/main/factories/usecases/account/load-account-by-token/db-load-account-by-token-factory'

export const mockAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(mockDbLoadAccountByToken(), role)
}
