import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey-controller'
import { Controller } from '@/presentation/protocols'
import { mockLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { mockDbAddSurvey } from '@/main/factories/usecases/survey/add-survey/db-add-survey-factory'
import { mockAddSurveyValidation } from './add-survey-validation-factory'

export const mockAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(mockAddSurveyValidation(), mockDbAddSurvey())
  return mockLogControllerDecorator(controller)
}
