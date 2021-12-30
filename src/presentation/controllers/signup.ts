import { HttpRequest, HttpResponse } from '../protocols/http';

export default class SignUpController {
  static handle(httpRequest: HttpRequest): HttpResponse {
    let ret: HttpResponse;
    const { body } = httpRequest;

    if (!body.name) {
      ret = {
        body: new Error('Missing param: name'),
        statusCode: 400,
      };
    }

    if (!body.email) {
      ret = {
        body: new Error('Missing param: email'),
        statusCode: 400,
      };
    }

    return ret;
  }
}
