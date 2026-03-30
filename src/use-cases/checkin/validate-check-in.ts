
import { CheckIn } from "@prisma/client";
import { CheckInResponsitory } from "@/respositories/check-ins-respository";
import { ResourceNotFoundError } from "../Errors/resource-not-found-error";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "../Errors/late-check-in-validation-error";

interface CheckinValidateUseCaseRequest {
  checkInId: string;
}

interface CheckinValidateUseCaseResponse {
  checkIn: CheckIn
}


export class ValidateCheckInUseCase {

  constructor(
    private checkInRepository: CheckInResponsitory,
  ) { }

  async execute(
    {  checkInId }: CheckinValidateUseCaseRequest
  ): Promise<CheckinValidateUseCaseResponse> {

    const checkIn = await this.checkInRepository.findById(checkInId)
    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(checkIn.created_at, "minutes")

    if(distanceInMinutesFromCheckInCreation > 20){
      throw new LateCheckInValidationError()
    }
  
    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return {
      checkIn
    }
  }
}