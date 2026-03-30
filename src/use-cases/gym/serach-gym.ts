import { Gym } from "@prisma/client"
import { GymsRepository } from "@/respositories/gyms-repository"


interface SearchGymUseCaseProms {
  query: string
  page: number
}
interface SearchGymUseCaseResponse {
  gyms: Gym[]
}
export class SearchGymUseCase {

  constructor(private gymsRepository: GymsRepository) { }


  async execute({ query, page }: SearchGymUseCaseProms): Promise<SearchGymUseCaseResponse> {

   const gyms = await this.gymsRepository.searchMany(query, page)
    return {gyms }
  }
}

