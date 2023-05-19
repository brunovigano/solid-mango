import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys/load-surveys-controller'
import { Controller } from '@/presentation/protocols'
import { mockLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { mockDbLoadSurveys } from '@/main/factories/usecases/survey/load-survey/db-load-survey-factory'

export const mockLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(mockDbLoadSurveys())
  return mockLogControllerDecorator(controller)
}
