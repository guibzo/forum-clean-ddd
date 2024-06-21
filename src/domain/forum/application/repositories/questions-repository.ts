import type { Question } from '../../enterprise/entities/question'

export type QuestionsRepository = {
  findBySlug: (slug: string) => Promise<Question | null>
  create: (answer: Question) => Promise<void>
}
