import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '@/main/config/app'

let surveyResultCollection: Collection

// const makeAccessToken = async (): Promise<string> => {
//   const account = await accountCollection.insertOne({
//     name: 'Bruno',
//     email: 'bruno.vigano@gmail.com',
//     password: '123',
//     role: 'admin',
//   })

//   const { jwtSecret } = env
//   const id = account.ops[0]._id
//   const accessToken = sign({ id }, jwtSecret)

//   await accountCollection.updateOne(
//     {
//       _id: id,
//     },
//     {
//       $set: {
//         accessToken,
//       },
//     }
//   )

//   return accessToken
// }

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

    // test('should return 204 on add survey with valid token', async () => {
    //   const accessToken = await makeAccessToken()
    //   await request(app)
    //     .post('/api/surveys')
    //     .set('x-access-token', accessToken)
    //     .send({
    //       question: 'Question',
    //       answers: [{ answer: 'Answer 1', image: 'http://image-name.com' }, { answer: 'Answer 2' }],
    //     })
    //     .expect(204)
    // })
  })

  // describe('GET /surveys', () => {
  //   test('should return 403 on load all survey without access token', async () => {
  //     await request(app).get('/api/surveys').expect(403)
  //   })

  //   test('should return 204 on load surveys with valid access token', async () => {
  //     const accessToken = await makeAccessToken()
  //     await request(app).get('/api/surveys').set('x-access-token', accessToken).expect(204)
  //   })
  // })
})
