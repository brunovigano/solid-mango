/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { AddSurveyParams } from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { SurveyModel } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id-protocols'
import { mockSurveyModel, mockSurveyModels } from '@/domain/test'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    add(survey: AddSurveyParams): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdStub implements LoadSurveyByIdRepository {
    loadById(id: string): Promise<SurveyModel> {
      return new Promise(resolve => {
        resolve(mockSurveyModel())
      })
    }
  }
  return new LoadSurveyByIdStub()
}

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysStub implements LoadSurveysRepository {
    loadAll(): Promise<SurveyModel[]> {
      return new Promise(resolve => {
        resolve(mockSurveyModels())
      })
    }
  }
  return new LoadSurveysStub()
}
