import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { env } from '@/main/config/env'

export const mockDbAddAccount = (): DbAddAccount => {
  const { salt } = env
  const accountMongoRepository = new AccountMongoRepository()
  const bCryptAdapter = new BcryptAdapter(salt)
  return new DbAddAccount(bCryptAdapter, accountMongoRepository, accountMongoRepository)
}
