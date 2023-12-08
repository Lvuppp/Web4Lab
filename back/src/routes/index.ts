import { Router } from 'express'
import employeeRouter from './employee.router'
import orderRoutes from './order.routes'
import foodRoutes from './food.routes'
import facilityRoutes from './facility.routes'
import animalRoutes from './animal.routes'

const router = Router()
router.use('/employees', employeeRouter)
router.use('/orders', orderRoutes)
router.use('/food', foodRoutes)
router.use('/facilities', facilityRoutes)
router.use('/animals', animalRoutes)

export default router
