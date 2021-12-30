interface retorno {
  statusCode: number;
  body: string | Error;
}

export default class SignUpController {
  static handle(httpRequest: any | string): retorno {
    let ret: retorno;

    if (!httpRequest.body?.name) {
      ret = {
        body: new Error('Missing param: name'),
        statusCode: 400,
      };
    }

    return ret;
  }
}
