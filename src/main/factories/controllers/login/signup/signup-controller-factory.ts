import { SignUpController } from '@/presentation/controllers/login/signup/signup-controller'
import { Controller } from '@/presentation/protocols/controller'
import { mockLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { mockDbAddAccount } from '@/main/factories/usecases/account/add-account/db-add-account-factory'
import { mockDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { mockSignUpValidation } from './signup-validation-factory'

export const mockSignUpController = (): Controller => {
  const controller = new SignUpController(
    mockDbAddAccount(),
    mockSignUpValidation(),
    mockDbAuthentication()
  )
  return mockLogControllerDecorator(controller)
}
