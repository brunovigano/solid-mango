import { Controller } from '@/presentation/protocols'
import { mockLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { mockDbLoadSurveysById } from '@/main/factories/usecases/survey/load-survey-by-id/db-load-survey-by-id-factory'
import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result/load-survey-result-controller'
import { mockDbLoadSurveyResult } from '@/main/factories/usecases/survey-result/load-survey-result/db-load-survey-result-factory'

export const mockLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(
    mockDbLoadSurveysById(),
    mockDbLoadSurveyResult()
  )
  return mockLogControllerDecorator(controller)
}
