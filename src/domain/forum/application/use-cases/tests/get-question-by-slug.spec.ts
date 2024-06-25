import { Success } from '@/core/either-failure-or-success'
import { makeQuestion } from '@/tests/factories/make-question'
import { InMemoryQuestionsRepository } from '@/tests/repositories/in-memory-questions-repository'
import { Slug } from '../../../enterprise/entities/value-objects/slug'
import { GetQuestionBySlugUseCase } from '../get-question-by-slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get question by slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question-title'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'example-question-title',
    })

    expect(result).toBeInstanceOf(Success)
    if (result instanceof Success) {
      expect(result.value?.question.id).toBeTruthy()
      expect(result.value?.question.title).toEqual(newQuestion.title)
    }
  })
})
