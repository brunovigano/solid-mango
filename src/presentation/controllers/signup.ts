import { AddAccount } from '../../domain/usecases/add-account';
import { InvalidParamError, MissingParamError } from '../errors';
import { badRequest, serverError } from '../helpers/http-helper';
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols';

export default class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      let ret: HttpResponse;
      const { name, email, password, passwordConfirmation } = httpRequest.body;
      const requiredParams = ['name', 'email', 'password', 'passwordConfirmation'];

      for (const field of requiredParams) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isValid = this.emailValidator.isValid(email);

      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }

      this.addAccount.add({ name, email, password });

      return ret;
    } catch (error) {
      return serverError();
    }
  }
}
