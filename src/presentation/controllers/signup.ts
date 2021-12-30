import { MissingParamError } from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export default class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    let ret: HttpResponse;
    const { body } = httpRequest;
    const requiredParams = ['name', 'email', 'password', 'passwordConfirmation'];

    for (const field of requiredParams) {
      if (!body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    return ret;
  }
}
