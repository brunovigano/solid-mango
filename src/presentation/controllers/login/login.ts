import { Authentication } from '../../../domain/usecases/authentication'
import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { EmailValidator } from '../../protocols/email-validator'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  private readonly authentication: Authentication

  constructor(emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      if (!email) {
        return badRequest(new MissingParamError('email'))
      }

      if (!password) {
        return badRequest(new MissingParamError('password'))
      }

      const isValidMail = this.emailValidator.isValid(email)

      if (!isValidMail) {
        return badRequest(new InvalidParamError('email'))
      }

      const authentication = await this.authentication.auth(email, password)

      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
