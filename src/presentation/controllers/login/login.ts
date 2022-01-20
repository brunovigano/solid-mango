import { InvalidParamError } from '../../errors/invalid-param-error'
import { MissingParamError } from '../../errors/missing-param-error'
import { badRequest } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { EmailValidator } from '../../protocols/email-validator'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class LoginController implements Controller {
  emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest

    if (!body.email) {
      return badRequest(new MissingParamError('email'))
    }

    if (!body.password) {
      return badRequest(new MissingParamError('password'))
    }

    const isValidMail = this.emailValidator.isValid(body.email)

    if (!isValidMail) {
      return badRequest(new InvalidParamError('email'))
    }

    return null
  }
}
