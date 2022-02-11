import { AccessDeniedError } from '../errors/access-denied-error'
import { forbidden } from '../helpers/http/http-helper'
import { Middleware, HttpRequest, HttpResponse } from '../protocols'

export class AuthMiddleware implements Middleware {
  handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise((resolve, reject) => {
      resolve(forbidden(new AccessDeniedError()))
    })
  }
}
