import { AddSurvey, AddSurveyModel } from '@/domain/usecases/add-survey'
import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'

export class DbAddSurvey implements AddSurvey {
  constructor(private readonly addSurveyRepository: AddSurveyRepository) {}

  async add(data: AddSurveyModel): Promise<void> {
    return this.addSurveyRepository.add(data)
  }
}
