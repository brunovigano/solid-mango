import { mockAccountModel, throwError } from '@/domain/test'
import { DbLoadAccountByToken } from './db-load-account-by-token'
import { LoadAccountByTokenRepository, Decrypter } from './db-load-account-by-token-protocols'
import { mockDecrypter, mockLoadAccountByTokenRepository } from '@/data/test'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = mockDecrypter()
  const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)
  return {
    decrypterStub,
    sut,
    loadAccountByTokenRepositoryStub,
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  test('should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('should return null if Decrypter return null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(
      new Promise(resolve => {
        resolve(null)
      })
    )
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('should call LoadAccountByRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token', 'any_role')
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  test('should return null if LoadAccountByTokenRepository return null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(
      new Promise(resolve => {
        resolve(null)
      })
    )
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_token', 'any_role')
    expect(account).toEqual(mockAccountModel())
  })

  test('should throw if Decrypter throws', async () => {
    const { decrypterStub, sut } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(throwError)
    const promiseAccount = sut.load('any_token', 'any_role')
    await expect(promiseAccount).rejects.toThrow()
  })

  test('should throw if LoadAccountByTokenRepository throws', async () => {
    const { loadAccountByTokenRepositoryStub, sut } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockImplementationOnce(throwError)
    const promiseAccount = sut.load('any_token', 'any_role')
    await expect(promiseAccount).rejects.toThrow()
  })
})
