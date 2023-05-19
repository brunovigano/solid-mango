import { LoginController } from '@/presentation/controllers/login/login/login-controller'
import { Controller } from '@/presentation/protocols'
import { mockLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { mockDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { mockLoginValidation } from './login-validation-factory'

export const mockLoginController = (): Controller => {
  const controller = new LoginController(mockDbAuthentication(), mockLoginValidation())
  return mockLogControllerDecorator(controller)
}
