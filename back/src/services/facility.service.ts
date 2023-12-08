import { dataSource } from '../dataSource'
import { FacilityEntity } from '../entities/facility.entity'
import { CustomError } from '../middlewares/error.middleware'

export class FacilityService {
  private facilityRepository = dataSource.getRepository(FacilityEntity)

  async getAllFacilities(): Promise<FacilityEntity[]> {
    try {
      return this.facilityRepository.find()
    } catch (error) {
      throw new CustomError(`Error while fetching facilities: ${(error as Error).message}`, 500)
    }
  }
}
