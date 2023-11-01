import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http/http-helper'
import {
  HttpRequest,
  HttpResponse,
  Controller,
  Authentication,
  Validation,
} from './login-controller-protocols'

export class LoginController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest.body
      const authReturn = await this.authentication.auth({ email, password })

      if (!authReturn?.accessToken) {
        return unauthorized()
      }

      return ok(authReturn)
    } catch (error) {
      return serverError(error)
    }
  }
}
