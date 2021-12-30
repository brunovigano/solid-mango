import { MissingParamError } from '../errors/missing-param-error';
import { HttpRequest, HttpResponse } from '../protocols/http';

export default class SignUpController {
  static handle(httpRequest: HttpRequest): HttpResponse {
    let ret: HttpResponse;
    const { body } = httpRequest;

    if (!body.name) {
      ret = {
        body: new MissingParamError('name'),
        statusCode: 400,
      };
    }

    if (!body.email) {
      ret = {
        body: new MissingParamError('email'),
        statusCode: 400,
      };
    }

    return ret;
  }
}
