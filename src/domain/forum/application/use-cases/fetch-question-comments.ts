import type { QuestionComment } from '../../enterprise/entities/question-comment'
import type { QuestionCommentsRepository } from '../repositories/question-comments-repository'

type FetchQuestionCommentsUseCaseRequest = {
  page: number
  questionId: string
}

type FetchQuestionCommentsUseCaseResponse = {
  questionComments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments = await this.questionCommentsRepository.findManyByQuestionId(
      questionId,
      { page }
    )

    return {
      questionComments,
    }
  }
}
