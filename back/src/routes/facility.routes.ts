import express from 'express'
import { facilityController } from '../controllers/facility.controller'
import { authenticateCookieMiddleware } from '../middlewares/auth.middleware'

const router = express.Router()

router.get('/facilities', authenticateCookieMiddleware, facilityController.getAllFacilities)

export default router
