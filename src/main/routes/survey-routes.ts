import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { mockAddSurveyController } from '@/main/factories/controllers/survey/add-survey/add-survey-controller-factory'
import { mockLoadSurveysController } from '@/main/factories/controllers/survey/load-surveys/load-surveys-controller-factory'
import { adminAuth } from '@/main/middlewares/admin-auth'
import { auth } from '@/main/middlewares/auth'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(mockAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(mockLoadSurveysController()))
}
