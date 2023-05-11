import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  accountId: 'any_account',
  answer: 'any_answer',
  date: new Date(),
  surveyId: 'any_survey',
})

export const mockSurveyResultModel = (): SurveyResultModel => ({
  ...mockSaveSurveyResultParams(),
  id: 'any_id',
})
