import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../presentation/protocols/controller'
import { env } from '../../config/env'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const { salt, jwtSecret } = env
  const accountMongoRepository = new AccountMongoRepository()
  const bCryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bCryptAdapter, accountMongoRepository)
  const jwtAdapter = new JwtAdapter(jwtSecret)
  const logMongoRepository = new LogMongoRepository()

  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bCryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )

  const signUpController = new SignUpController(
    dbAddAccount,
    makeSignUpValidation(),
    dbAuthentication
  )

  return new LogControllerDecorator(signUpController, logMongoRepository)
}
