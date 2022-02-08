import request from 'supertest'
import app from '../config/app'

describe('CORS Middleware', () => {
  test('should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })

    await request(app).get('/test_cors').expect('access-control-allow-origin', '*')
    await request(app).get('/test_cors').expect('access-control-allow-methods', '*')
    await request(app).get('/test_cors').expect('access-control-allow-headers', '*')
  })
})
