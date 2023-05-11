import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@/presentation/errors'
import { AuthMiddleware } from './auth-middleware'
import { LoadAccountByToken, HttpRequest, AccountModel } from './auth-middleware-protocols'
import { mockAccountModel, throwError } from '@/domain/test'

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenStub: LoadAccountByToken
}

const makeLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    load(accessToken: string, role?: string): Promise<AccountModel> {
      return new Promise((resolve, reject) => {
        resolve(mockAccountModel())
      })
    }
  }
  return new LoadAccountByTokenStub()
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub, role)
  return {
    sut,
    loadAccountByTokenStub,
  }
}

const makeFakeRequest = (): HttpRequest => ({ headers: { 'x-access-token': 'any_token' } })

describe('Auth Middleware', () => {
  test('should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenStub } = makeSut(role)
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token', role)
  })

  test('should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest
      .spyOn(loadAccountByTokenStub, 'load')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.handle(makeFakeRequest())
    expect(account).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut } = makeSut()
    const account = await sut.handle(makeFakeRequest())
    expect(account).toEqual(ok({ accountId: 'any_id' }))
  })

  test('should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockImplementationOnce(throwError)
    const account = await sut.handle(makeFakeRequest())
    expect(account).toEqual(serverError(new Error()))
  })
})
