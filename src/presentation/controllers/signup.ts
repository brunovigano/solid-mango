import { MissingParamError } from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';
import { HttpRequest, HttpResponse } from '../protocols/http';

export default class SignUpController {
  static handle(httpRequest: HttpRequest): HttpResponse {
    let ret: HttpResponse;
    const { body } = httpRequest;

    if (!body.name) {
      return badRequest(new MissingParamError('name'));
    }

    if (!body.email) {
      return badRequest(new MissingParamError('email'));
    }

    return ret;
  }
}
