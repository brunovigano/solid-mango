import { access } from 'fs'
import { AddAccount } from '../../../domain/usecases/add-account'
import { EmailInUseError } from '../../errors'
import {
  badRequest,
  forbidden,
  ok,
  serverError,
} from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Authentication, Validation } from './signup-controller-protocols'

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
      const accessToken = await this.authentication.auth({ email, password })

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
