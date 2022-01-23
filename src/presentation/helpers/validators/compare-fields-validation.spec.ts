import { InvalidParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('fieldOne', 'fieldTwo')
}

describe('CompareFields Validation', () => {
  test('should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ fieldOne: 'any_field', fieldTwo: 'any_other_field' })
    expect(error).toEqual(new InvalidParamError('fieldTwo'))
  })

  test('should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ fieldOne: 'field', fieldTwo: 'field' })
    expect(error).toBeFalsy()
  })
})
