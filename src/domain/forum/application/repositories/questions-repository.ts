import type { Question } from '../../enterprise/entities/question'

export type QuestionsRepository = {
  findById: (id: string) => Promise<Question | null>
  findBySlug: (slug: string) => Promise<Question | null>
  create: (answer: Question) => Promise<void>
  delete: (question: Question) => Promise<void>
}
