import type { Answer } from '../../enterprise/entities/answer'

export type AnswersRepository = {
  create: (answer: Answer) => Promise<void>
  // find: (questionId: string) => Promise<Answer[]>
  // delete: (answer: Answer) => Promise<void>
}
