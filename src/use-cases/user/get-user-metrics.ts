import { ResourceNotFoundError } from "../Errors/resource-not-found-error";
import { CheckInResponsitory } from "@/respositories/check-ins-respository";


interface GetUserMetricsUseCaseRequest {
  userId: string;
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
constructor(private checkInsRepository: CheckInResponsitory) { }
  async execute(
    { userId }: GetUserMetricsUseCaseRequest
  ): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount
    }
  }
}