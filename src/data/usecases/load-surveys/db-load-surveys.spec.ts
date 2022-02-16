import { SurveyModel } from '../../../domain/models/survey'
import { DbLoadSurveys } from './db-load-surveys'
import { LoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository'

interface SutTypes {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeFakeSurvey = (): SurveyModel[] => [
  {
    date: new Date(),
    id: 'any_id',
    question: 'any_question',
    answers: [{ answer: 'any_answer', image: 'any_image' }],
  },
  {
    date: new Date(),
    id: 'another_id',
    question: 'another_question',
    answers: [{ answer: 'another_answer' }],
  },
]

// const makeDecrypter = (): Decrypter => {
//   class DecrypterStub implements Decrypter {
//     decrypt(value: string): Promise<string> {
//       return new Promise(resolve => {
//         resolve('any_token')
//       })
//     }
//   }
//   return new DecrypterStub()
// }

const makeLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysStub implements LoadSurveysRepository {
    loadAll(): Promise<SurveyModel[]> {
      return new Promise(resolve => {
        resolve(makeFakeSurvey())
      })
    }
  }
  return new LoadSurveysStub()
}

const makeSut = (): SutTypes => {
  // const decrypterStub = makeDecrypter()
  const loadSurveysRepositoryStub = makeLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
  return {
    // decrypterStub,
    sut,
    loadSurveysRepositoryStub,
  }
}

describe('DbLoadSurveys Usecase', () => {
  // test('should call Decrypter with correct values', async () => {
  //   const { sut, decrypterStub } = makeSut()
  //   const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
  //   await sut.load('any_token', 'any_role')
  //   expect(decryptSpy).toHaveBeenCalledWith('any_token')
  // })

  // test('should return null if Decrypter return null', async () => {
  //   const { sut, decrypterStub } = makeSut()
  //   jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(
  //     new Promise(resolve => {
  //       resolve(null)
  //     })
  //   )
  //   const account = await sut.load('any_token', 'any_role')
  //   expect(account).toBeNull()
  // })

  test('should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  // test('should return null if LoadAccountByTokenRepository return null', async () => {
  //   const { sut, loadAccountByTokenRepositoryStub } = makeSut()
  //   jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(
  //     new Promise(resolve => {
  //       resolve(null)
  //     })
  //   )
  //   const account = await sut.load('any_token', 'any_role')
  //   expect(account).toBeNull()
  // })

  // test('should return an account on success', async () => {
  //   const { sut } = makeSut()
  //   const account = await sut.load('any_token', 'any_role')
  //   expect(account).toEqual(makeFakeSurvey())
  // })

  // test('should throw if Decrypter throws', async () => {
  //   const { decrypterStub, sut } = makeSut()
  //   jest
  //     .spyOn(decrypterStub, 'decrypt')
  //     .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
  //   const promiseAccount = sut.load('any_token', 'any_role')
  //   await expect(promiseAccount).rejects.toThrow()
  // })

  // test('should throw if LoadAccountByTokenRepository throws', async () => {
  //   const { loadAccountByTokenRepositoryStub, sut } = makeSut()
  //   jest
  //     .spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
  //     .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
  //   const promiseAccount = sut.load('any_token', 'any_role')
  //   await expect(promiseAccount).rejects.toThrow()
  // })
})
