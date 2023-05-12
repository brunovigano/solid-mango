/* eslint-disable @typescript-eslint/no-unused-vars */
import { EmailValidator } from '@/validation/protocols/email-validator'

export const mockEmailValidator = () => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
