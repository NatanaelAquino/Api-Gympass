
import { Gym } from "@prisma/client"
import { GymsRepository } from "@/respositories/gyms-repository"


interface FetchNearByGymUseCaseProms {
  userLatitude: number
  userLongitude: number
}
interface FetchNearByGymUseCaseResponse {
  gyms: Gym[]
}
export class FetchNearByGymUseCase {

  constructor(private gymsRepository: GymsRepository) { }


  async execute({ userLatitude, userLongitude }: FetchNearByGymUseCaseProms): Promise<FetchNearByGymUseCaseResponse> {

   const gyms = await this.gymsRepository.findManyNearby({userLatitude, userLongitude})
    return {gyms }
  }
}

