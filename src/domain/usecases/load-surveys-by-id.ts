import { SurveyModel } from '@/domain/models/survey'

export interface LoadSurveysById {
  loadById(): Promise<SurveyModel>
}
