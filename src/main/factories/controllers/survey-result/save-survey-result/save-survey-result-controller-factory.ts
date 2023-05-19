import { Controller } from '@/presentation/protocols'
import { mockLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result/save-survey-result-controller'
import { mockDbLoadSurveysById } from '@/main/factories/usecases/survey/load-survey-by-id/db-load-survey-by-id-factory'
import { mockDbSaveSurveyResult } from '@/main/factories/usecases/survey-result/save-survey-result/db-save-survey-result-factory'

export const mockSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(
    mockDbLoadSurveysById(),
    mockDbSaveSurveyResult()
  )
  return mockLogControllerDecorator(controller)
}
