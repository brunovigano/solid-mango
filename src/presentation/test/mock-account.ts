/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'
import { mockAccountModel } from '@/domain/test'
import { Authentication, AuthenticationParams } from '@/domain/usecases/account/authentication'
import { Validation } from '../protocols'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(args: AddAccountParams): Promise<AccountModel> {
      const fakeAccount = mockAccountModel()
      return new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountStub()
}

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(authentication: AuthenticationParams): Promise<string> {
      return 'any_token'
    }
  }
  return new AuthenticationStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    load(accessToken: string, role?: string): Promise<AccountModel> {
      return new Promise((resolve, reject) => {
        resolve(mockAccountModel())
      })
    }
  }
  return new LoadAccountByTokenStub()
}
