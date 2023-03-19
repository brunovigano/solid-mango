import {
  SaveSurveyResult,
  SaveSurveyResultModel,
  SaveSurveyResultRepository,
  SurveyResultModel,
} from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(private readonly addSurveyResultRepository: SaveSurveyResultRepository) {}
  save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    return this.addSurveyResultRepository.save(data)
  }
}
