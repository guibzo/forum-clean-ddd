import { success, type Either } from '@/core/either-failure-or-success'
import { Question } from '../../enterprise/entities/question'
import type { QuestionsRepository } from '../repositories/questions-repository'

type FetchRecentQuestionsUseCaseRequest = {
  page: number
}

type FetchRecentQuestionsUseCaseResponse = Either<null, { questions: Question[] }>

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return success({
      questions,
    })
  }
}
