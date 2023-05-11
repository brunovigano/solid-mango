import MockDate from 'mockdate'
import { DbAddSurvey } from './db-add-survey'
import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { throwError } from '@/domain/test'
import { mockAddSurveyRepository } from '@/data/test'

type SutTypes = {
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}

const makeFakeSurveyData = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [{ image: 'any_image', answer: 'any_answer' }],
  date: new Date(),
})

const makeFakeSurvey = (): SurveyModel => ({
  id: 'valid_id',
  question: 'any_question',
  answers: [{ image: 'any_image', answer: 'any_answer' }],
  date: new Date(),
})

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = mockAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)

  return {
    sut,
    addSurveyRepositoryStub,
  }
}

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('should call AddSurveyRepository with correct values', async () => {
    const { addSurveyRepositoryStub, sut } = makeSut()
    const addSurveySpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const surveyData = makeFakeSurveyData()
    await sut.add(surveyData)
    expect(addSurveySpy).toHaveBeenCalledWith(surveyData)
  })

  test('should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(throwError)
    const promiseAccount = sut.add(makeFakeSurveyData())
    await expect(promiseAccount).rejects.toThrow()
  })
})
