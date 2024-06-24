import type { AnswerComment } from '../../enterprise/entities/answer-comment'

export type AnswerCommentsRepository = {
  create(answerComment: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  delete(answerComment: AnswerComment): Promise<void>
}
