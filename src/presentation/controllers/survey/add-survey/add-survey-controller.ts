import { badRequest, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import {
  AddSurvey,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
} from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor(private readonly validation: Validation, private readonly addSurvey: AddSurvey) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { question, answers } = httpRequest.body
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      await this.addSurvey.add({ answers, question, date: new Date() })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
