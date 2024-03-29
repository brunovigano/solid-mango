import { AddAccount } from '@/domain/usecases/account/add-account'
import { EmailInUseError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Authentication, Validation } from './signup-controller-protocols'
import { auth } from '@/main/middlewares/auth'

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation?: Validation,
    private readonly authentication?: Authentication
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password } = httpRequest.body
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const account = await this.addAccount.add({ name, email, password })

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      const authReturn = await this.authentication.auth({ email, password })

      return ok(authReturn)
    } catch (error) {
      return serverError(error)
    }
  }
}
