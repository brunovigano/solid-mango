import { Validation } from '@/presentation/controllers/login/signup/signup-controller-protocols'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'

export const mockAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
