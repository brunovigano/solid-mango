import { Decrypter } from '../../protocols/criptography/decrypter'
import { AccountModel } from '../add-account/db-add-account-protocols'
import { DbLoadAccountByToken } from './db-load-account-by-token'
import { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository'

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password',
})

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    decrypt(value: string): Promise<string> {
      return new Promise(resolve => {
        resolve('any_token')
      })
    }
  }
  return new DecrypterStub()
}

const makeLoadAccountByRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByRepositoryStub implements LoadAccountByTokenRepository {
    loadByToken(token: string, role?: string): Promise<AccountModel> {
      return new Promise(resolve => {
        resolve(makeFakeAccount())
      })
    }
  }
  return new LoadAccountByRepositoryStub()
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const loadAccountByTokenRepositoryStub = makeLoadAccountByRepository()
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
    expect(account).toEqual(makeFakeAccount())
  })

  test('should throw if Decrypter throws', async () => {
    const { decrypterStub, sut } = makeSut()
    jest
      .spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promiseAccount = sut.load('any_token', 'any_role')
    await expect(promiseAccount).rejects.toThrow()
  })

  test('should throw if LoadAccountByTokenRepository throws', async () => {
    const { loadAccountByTokenRepositoryStub, sut } = makeSut()
    jest
      .spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promiseAccount = sut.load('any_token', 'any_role')
    await expect(promiseAccount).rejects.toThrow()
  })
})
