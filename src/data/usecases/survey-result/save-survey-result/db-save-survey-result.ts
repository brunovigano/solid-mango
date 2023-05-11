import {
  SaveSurveyResult,
  SaveSurveyResultParams,
  SaveSurveyResultRepository,
  SurveyResultModel,
} from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(private readonly addSurveyResultRepository: SaveSurveyResultRepository) {}
  save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    return this.addSurveyResultRepository.save(data)
  }
}
