import { mockFakeAuthentication, throwError } from '@/domain/test'
import { DbAuthentication } from './db-authentication'
import {
  HashCompare,
  Encrypter,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from './db-authentication-protocols'
import {
  mockEncrypter,
  mockHashComparer,
  mockLoadAccountByEmailRepository,
  mockUpdateAccessTokenRepository,
} from '@/data/test'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashCompareStub: HashCompare
  encrypterStub: Encrypter
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const hashCompareStub = mockHashComparer()
  const encrypterStub = mockEncrypter()
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  )
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    encrypterStub,
    updateAccessTokenRepositoryStub,
  }
}

describe('DbAuthentication Usecase', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(mockFakeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('should throw if LoadAccountByEmailRepository throws', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(throwError)
    const auth = sut.auth(mockFakeAuthentication())
    await expect(auth).rejects.toThrow()
  })

  test('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    const accessToken = await sut.auth(mockFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  test('should call HashCompare with correct values', async () => {
    const { hashCompareStub, sut } = makeSut()
    const compareSpy = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth(mockFakeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'any_password')
  })

  test('should throw if HashCompare throws', async () => {
    const { hashCompareStub, sut } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockImplementationOnce(throwError)
    const auth = sut.auth(mockFakeAuthentication())
    await expect(auth).rejects.toThrow()
  })

  test('should return null if HashCompare returns false', async () => {
    const { hashCompareStub, sut } = makeSut()
    jest
      .spyOn(hashCompareStub, 'compare')
      .mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const accessToken = await sut.auth(mockFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  test('should call Encrypter with correct id', async () => {
    const { encrypterStub, sut } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(mockFakeAuthentication())
    expect(encryptSpy).toHaveBeenCalledWith('any_id')
  })

  test('should throw if Encrypter throws', async () => {
    const { encrypterStub, sut } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(throwError)
    const auth = sut.auth(mockFakeAuthentication())
    await expect(auth).rejects.toThrow()
  })

  test('should return token on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(mockFakeAuthentication())
    expect(accessToken).toBe('any_token')
  })

  test('should call UpdateAccessTokenRepository with correct values', async () => {
    const { updateAccessTokenRepositoryStub, sut } = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.auth(mockFakeAuthentication())
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('should throw if UpdateAccessTokenRepository throws', async () => {
    const { updateAccessTokenRepositoryStub, sut } = makeSut()
    jest
      .spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
      .mockImplementationOnce(throwError)
    const auth = sut.auth(mockFakeAuthentication())
    await expect(auth).rejects.toThrow()
  })
})
