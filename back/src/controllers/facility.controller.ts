import { FacilityService } from '../services/facility.service'
import { NextFunction, Response, Request } from 'express'

export class FacilityController {
  private facilityService = new FacilityService()

  async getAllFacilities(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const facilities = await this.facilityService.getAllFacilities()
      res.json(facilities)
    } catch (error) {
      next(error)
    }
  }
}

export const facilityController = new FacilityController()
