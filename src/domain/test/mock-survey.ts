import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'

export const mockSurveyModel = (): SurveyModel => {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [
      {
        answer: 'any_answer',
      },
      {
        answer: 'other_answer',
        image: 'any_image',
      },
    ],
    date: new Date(),
  }
}

export const mockSurveyModels = (): SurveyModel[] => [
  {
    date: new Date(),
    id: 'any_id',
    question: 'any_question',
    answers: [{ answer: 'any_answer', image: 'any_image' }],
  },
  {
    date: new Date(),
    id: 'another_id',
    question: 'another_question',
    answers: [{ answer: 'another_answer' }],
  },
]

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [{ image: 'any_image', answer: 'any_answer' }],
  date: new Date(),
})
