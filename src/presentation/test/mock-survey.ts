/* eslint-disable @typescript-eslint/no-unused-vars */
import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test'
import { AddSurvey, AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'

export const mockAddSurvey = () => {
  class AddSurveyStub implements AddSurvey {
    add(data: AddSurveyParams): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddSurveyStub()
}

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return new Promise(resolve => {
        resolve(mockSurveyModels())
      })
    }
  }
  return new LoadSurveysStub()
}

export const makeLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById(id: string): Promise<SurveyModel> {
      return new Promise(resolve => {
        resolve(mockSurveyModel())
      })
    }
  }
  return new LoadSurveyByIdStub()
}
