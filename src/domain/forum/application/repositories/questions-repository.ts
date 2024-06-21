import type { Question } from '../../enterprise/entities/question'

export type QuestionsRepository = {
  create: (answer: Question) => Promise<void>
}
