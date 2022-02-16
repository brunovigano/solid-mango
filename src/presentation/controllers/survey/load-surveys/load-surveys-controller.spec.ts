import MockDate from 'mockdate'
import { LoadSurveysController } from './load-surveys-controller'
import { SurveyModel, LoadSurveys } from './load-surveys-controller-protocols'

const makeFakeSurveys = (): SurveyModel[] => [
  {
    id: 'any_id',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer',
      },
    ],
    question: 'any_question',
    date: new Date(),
  },
  {
    id: 'other_id',
    answers: [
      {
        image: 'other_image',
        answer: 'other_answer',
      },
    ],
    question: 'other_question',
    date: new Date(),
  },
]

interface SutTypes {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return new Promise(resolve => {
        resolve(makeFakeSurveys())
      })
    }
  }
  return new LoadSurveysStub()
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub,
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('should call LoadSurveys', async () => {
    const { loadSurveysStub, sut } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
