import { failure, success, type Either } from '@/core/either-failure-or-success'
import type { QuestionsRepository } from '../repositories/questions-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type DeleteQuestionUseCaseRequest = {
  questionId: string
  authorId: string
}

type DeleteQuestionUseCaseResponse = Either<NotAllowedError | ResourceNotFoundError, {}>

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return failure(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return failure(new NotAllowedError())
    }

    await this.questionsRepository.delete(question)

    return success({})
  }
}
