import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import { Authentication } from '@/domain/usecases/authentication'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { env } from '@/main/config/env'

export const makeDbAuthentication = (): Authentication => {
  const { jwtSecret, salt } = env
  const accountMongoRepository = new AccountMongoRepository()
  const bCryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(jwtSecret)

  return new DbAuthentication(
    accountMongoRepository,
    bCryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )
}
