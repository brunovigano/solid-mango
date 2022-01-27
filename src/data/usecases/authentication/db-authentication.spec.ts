import { DbAuthentication } from './db-authentication'
import {
  AccountModel,
  AuthenticationModel,
  HashCompare,
  TokenGenerator,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from './db-authentication-protocols'

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password',
})

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load(email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeHashCompare = (): HashCompare => {
  class HashComparerStub implements HashCompare {
    async compare(value: string, hash: string): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new HashComparerStub()
}

const makeGenerator = (): TokenGenerator => {
  class TokenGeneratorStub implements TokenGenerator {
    async generate(id: string): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }
  return new TokenGeneratorStub()
}

const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async update(id: string, token: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashCompareStub: HashCompare
  tokenGeneratorStub: TokenGenerator
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hashCompareStub = makeHashCompare()
  const tokenGeneratorStub = makeGenerator()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub
  )
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub,
  }
}

const makeFakeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password',
})

describe('DbAuthentication Usecase', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(makeFakeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('should throw if LoadAccountByEmailRepository throws', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'load')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const auth = sut.auth(makeFakeAuthentication())
    await expect(auth).rejects.toThrow()
  })

  test('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(null)
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  test('should call HashCompare with correct values', async () => {
    const { hashCompareStub, sut } = makeSut()
    const compareSpy = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth(makeFakeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('should throw if HashCompare throws', async () => {
    const { hashCompareStub, sut } = makeSut()
    jest
      .spyOn(hashCompareStub, 'compare')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const auth = sut.auth(makeFakeAuthentication())
    await expect(auth).rejects.toThrow()
  })

  test('should return null if HashCompare returns false', async () => {
    const { hashCompareStub, sut } = makeSut()
    jest
      .spyOn(hashCompareStub, 'compare')
      .mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  test('should call TokenGenerator with correct id', async () => {
    const { tokenGeneratorStub, sut } = makeSut()
    const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate')
    await sut.auth(makeFakeAuthentication())
    expect(generateSpy).toHaveBeenCalledWith('any_id')
  })

  test('should throw if TokenGenerator throws', async () => {
    const { tokenGeneratorStub, sut } = makeSut()
    jest
      .spyOn(tokenGeneratorStub, 'generate')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const auth = sut.auth(makeFakeAuthentication())
    await expect(auth).rejects.toThrow()
  })

  test('should return token on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBe('any_token')
  })

  test('should call UpdateAccessTokenRepository with correct values', async () => {
    const { updateAccessTokenRepositoryStub, sut } = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'update')
    await sut.auth(makeFakeAuthentication())
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('should throw if UpdateAccessTokenRepository throws', async () => {
    const { updateAccessTokenRepositoryStub, sut } = makeSut()
    jest
      .spyOn(updateAccessTokenRepositoryStub, 'update')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const auth = sut.auth(makeFakeAuthentication())
    await expect(auth).rejects.toThrow()
  })
})
