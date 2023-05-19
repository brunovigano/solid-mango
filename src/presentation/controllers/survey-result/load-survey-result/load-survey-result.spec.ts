import MockDate from 'mockdate'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { HttpRequest } from '@/presentation/protocols'
import { mockLoadSurveyById } from '@/presentation/test'
import { LoadSurveyResultController } from './load-survey-result-controller'

type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById()
  const sut = new LoadSurveyResultController(loadSurveyByIdStub)
  return { sut, loadSurveyByIdStub }
}

const mockRequest = (): HttpRequest => ({
  params: { surveyId: 'any_survey_id' },
  body: {
    answer: 'any_answer',
  },
  accountId: 'any_account_id',
})

describe('LoadSurveyResult Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const spy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(mockRequest())
    expect(spy).toHaveBeenCalledWith('any_survey_id')
  })
})
