import { unauthorized, forbidden, notFound, serverError, badRequest } from './components/'
import { apiKeyAuthSchema } from './schemas/'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema,
  },
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden,
}
