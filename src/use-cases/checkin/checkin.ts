import { CheckIn } from "@prisma/client";
import { compare } from "bcryptjs"
import { InvalidCredentialsError } from "../Errors/invalid-credentials-error";
import { CheckInResponsitory } from "@/respositories/check-ins-respository";
import { GymsRepository } from "@/respositories/gyms-repository";
import { ResourceNotFoundError } from "../Errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-bet-ween-coordinates";
import { MaxDistanceError } from "../Errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "../Errors/max-number-of-check-ins-error";

interface CheckinUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckinUseCaseResponse {
  checkIn: CheckIn
}


export class CheckinUseCase {

  constructor(
    private checkInRepository: CheckInResponsitory,
    private gymsRepository: GymsRepository
  ) { }

  async execute(
    { userId, gymId, userLatitude, userLongitude }: CheckinUseCaseRequest
  ): Promise<CheckinUseCaseResponse> {

    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }
    /// calculate distance between user and gym 

    const distance = getDistanceBetweenCoordinates({
      latitude: userLatitude,
      longitude: userLongitude
    }, {
      latitude: Number(gym.latitude),
      longitude: Number(gym.longitude)
    })
    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }
    const checkInOnSameDate = await this.checkInRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInsError()
    }

    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return {
      checkIn
    }
  }
}