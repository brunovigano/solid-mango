import { DbAddAccount } from '../../../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-mongo-repository'
import { env } from '../../../../config/env'

export const makeDbAddAccount = (): DbAddAccount => {
  const { salt } = env
  const accountMongoRepository = new AccountMongoRepository()
  const bCryptAdapter = new BcryptAdapter(salt)
  return new DbAddAccount(bCryptAdapter, accountMongoRepository, accountMongoRepository)
}
