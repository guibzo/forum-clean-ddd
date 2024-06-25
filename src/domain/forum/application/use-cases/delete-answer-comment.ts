import { success, type Either } from '@/core/either-failure-or-success'
import type { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import type { NotAllowedError } from './errors/not-allowed-error'
import type { ResourceNotFoundError } from './errors/resource-not-found-error'

type DeleteAnswerCommentUseCaseRequest = {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Answer comment not found.')
    }

    if (authorId !== answerComment.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.answerCommentsRepository.delete(answerComment)

    return success({})
  }
}
