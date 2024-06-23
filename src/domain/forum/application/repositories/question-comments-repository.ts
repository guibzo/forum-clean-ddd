import type { QuestionComment } from '../../enterprise/entities/question-comment'

export type QuestionCommentsRepository = {
  create(question: QuestionComment): Promise<void>
}
