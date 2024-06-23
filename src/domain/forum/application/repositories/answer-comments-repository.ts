import type { AnswerComment } from '../../enterprise/entities/answer-comment'

export type AnswerCommentsRepository = {
  create(answer: AnswerComment): Promise<void>
}
