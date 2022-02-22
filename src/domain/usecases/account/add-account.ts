import { AccountModel } from '@/domain/models/account-model'

export type AddAccountModel = Omit<AccountModel, 'id'>

export interface AddAccount {
  add(args: AddAccountModel): Promise<AccountModel>
}
