import MockDate from 'mockdate'
import faker from 'faker'
import { mockSurveyModels, throwError } from '@/domain/test'
import { DbLoadSurveys } from './db-load-surveys'
import { LoadSurveysRepository } from './db-load-surveys-protocols'
import { mockLoadSurveysRepository } from '@/data/test'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  return {
    sut,
    loadSurveysRepositoryStub,
  }
}

describe('DbLoadSurveys Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const accountId = faker.random.uuid()
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load(accountId)
    expect(loadAllSpy).toHaveBeenCalled()
    expect(loadAllSpy).toHaveBeenCalledWith(accountId)
  })

  test('should return a list of surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load(faker.random.uuid())
    expect(surveys).toEqual(mockSurveyModels())
  })

  test('should throw if LoadSurveysRepository throws', async () => {
    const { loadSurveysRepositoryStub, sut } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockImplementationOnce(throwError)
    const promiseAccount = sut.load(faker.random.uuid())
    await expect(promiseAccount).rejects.toThrow()
  })
})
