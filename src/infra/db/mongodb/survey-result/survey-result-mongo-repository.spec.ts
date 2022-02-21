import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { SurveyModel } from '@/domain/models/survey-model'
import { AccountModel } from '@/domain/models/account-model'
import { SurveyResultModel } from '@/domain/models/survey-result-model'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [{ answer: 'any_answer', image: 'any_image' }, { answer: 'another_answer' }],
    date: new Date(),
  })
  return res.ops[0]
}

const makeSurveyResult = async (
  surveyId: string,
  answer: string,
  accountId: string
): Promise<SurveyResultModel> => {
  const sut = makeSut()
  const surveyResult = await sut.save({
    surveyId,
    answer,
    accountId,
    date: new Date(),
  })
  return surveyResult
}

const makeAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
  })
  return res.ops[0]
}

const makeSut = () => {
  return new SurveyResultMongoRepository()
}

describe('Survey Result Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('save()', () => {
    test('should add a survey result if its new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const surveyResult = await makeSurveyResult(survey.id, survey.answers[0].answer, account.id)
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.answer).toBe(survey.answers[0].answer)
    })

    test('should update a survey result if isnt new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const surveyResult = await makeSurveyResult(survey.id, survey.answers[0].answer, account.id)
      const updatedResult = await makeSurveyResult(survey.id, survey.answers[1].answer, account.id)
      expect(updatedResult).toBeTruthy()
      expect(updatedResult.id).toEqual(surveyResult.id)
      expect(updatedResult.answer).toBe(survey.answers[1].answer)
    })
  })
})
