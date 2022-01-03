import { InvalidParamError, MissingParamError } from '../errors';
import { badRequest, serverError } from '../helpers/http-helper';
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols';

export default class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      let ret: HttpResponse;
      const { body } = httpRequest;
      const requiredParams = ['name', 'email', 'password', 'passwordConfirmation'];

      for (const field of requiredParams) {
        if (!body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      if (body.password !== body.passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isValid = this.emailValidator.isValid(body.email);

      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }

      return ret;
    } catch (error) {
      return serverError();
    }
  }
}
