import { CheckIn } from "@prisma/client"
import { CheckInResponsitory } from "@/respositories/check-ins-respository"


interface fectUserCheckInsHistoryRequest {
  userId: string
  page: number
}
interface fectUserCheckInsHistoryResponse {
  checkIns: CheckIn[]
}
export class FetchMemberCheckInsHistoryUseCase {

  constructor(private checkInsRepository: CheckInResponsitory) { }


  async execute({ userId, page }: fectUserCheckInsHistoryRequest): Promise<fectUserCheckInsHistoryResponse> {

    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

    return { checkIns }
  }
}

