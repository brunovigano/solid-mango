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

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('should call LoadSurveys', async () => {
    class LoadSurveysStub implements LoadSurveys {
      async load(): Promise<SurveyModel[]> {
        return new Promise(resolve => {
          resolve(makeFakeSurveys())
        })
      }
    }
    const loadSurveysStub = new LoadSurveysStub()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    const sut = new LoadSurveysController(loadSurveysStub)
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
