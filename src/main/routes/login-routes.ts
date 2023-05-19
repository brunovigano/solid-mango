import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { mockLoginController } from '@/main/factories/controllers/login/login/login-controller-factory'
import { mockSignUpController } from '@/main/factories/controllers/login/signup/signup-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(mockSignUpController()))
  router.post('/login', adaptRoute(mockLoginController()))
}
