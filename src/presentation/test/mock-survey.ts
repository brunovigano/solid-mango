/* eslint-disable @typescript-eslint/no-unused-vars */
import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test'
import { AddSurvey, AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'

export const mockAddSurvey = () => {
  class AddSurveyStub implements AddSurvey {
    add(data: AddSurveyParams): Promise<void> {
      return Promise.resolve()
    }
  }
  return new AddSurveyStub()
}

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    accountId: string
    async load(accountId: string): Promise<SurveyModel[]> {
      this.accountId = accountId
      return Promise.resolve(mockSurveyModels())
    }
  }
  return new LoadSurveysStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById(id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurveyModel())
    }
  }
  return new LoadSurveyByIdStub()
}
