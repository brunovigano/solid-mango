import { SaveSurveyResultController } from './save-survey-result-controller'
import { HttpRequest, LoadSurveyById, SurveyModel } from './save-survey-result-controller-protocols'

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
    },
  ],
  question: 'any_question',
  date: new Date(),
})

const makeFakeRequest = (): HttpRequest => ({
  params: { surveyId: 'any_survey_id' },
})

const makeLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById(id: string): Promise<SurveyModel> {
      return new Promise((resolve, reject) => {
        resolve(makeFakeSurvey())
      })
    }
  }
  return new LoadSurveyByIdStub()
}

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = makeLoadSurveyById()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub)
  return { sut, loadSurveyByIdStub }
}

describe('SaveSurveyResult Controller', () => {
  test('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const spy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    sut.handle(makeFakeRequest())
    expect(spy).toHaveBeenCalledWith('any_survey_id')
  })
})
