import { Collection } from 'mongodb'
import request from 'supertest'
import { sign } from 'jsonwebtoken'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '@/main/config/app'
import { env } from '../config/env'

let surveyResultCollection: Collection
let surveyCollection: Collection
let accountCollection: Collection

const mockAccessToken = async (): Promise<string> => {
  const account = await accountCollection.insertOne({
    name: 'Bruno',
    email: 'bruno.vigano189@gmail.com',
    password: '123',
  })

  const { jwtSecret } = env
  const id = account.ops[0]._id
  const accessToken = sign({ id }, jwtSecret)

  await accountCollection.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        accessToken,
      },
    }
  )

  return accessToken
}

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyResultCollection = await MongoHelper.getCollection('surveyResult')
    await surveyResultCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  describe('PUT /surveys/:surveyId/results', () => {
    test('should return 403 on save survey result without token', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer',
        })
        .expect(403)
    })

    test('should return 200 on save survey result with token', async () => {
      const accessToken = await mockAccessToken()
      const res = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{ answer: 'Answer 1', image: 'http://image-name.com' }, { answer: 'Answer 2' }],
        date: new Date(),
      })

      await request(app)
        .put(`/api/surveys/${res.ops[0]._id}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'Answer 1',
        })
        .expect(200)
    })
  })

  describe('GET /surveys/:surveyId/results', () => {
    test('should return 403 on load survey result without token', async () => {
      await request(app).put('/api/surveys/any_id/results').expect(403)
    })

    test('should return 200 on load survey result with token', async () => {
      const accessToken = await mockAccessToken()
      const res = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{ answer: 'Answer 1', image: 'http://image-name.com' }, { answer: 'Answer 2' }],
        date: new Date(),
      })

      await request(app)
        .get(`/api/surveys/${res.ops[0]._id}/results`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
