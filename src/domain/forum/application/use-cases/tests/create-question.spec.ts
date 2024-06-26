import { Success } from '@/core/either-failure-or-success'
import { InMemoryQuestionsRepository } from '@/tests/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from '../create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      content: 'Test content',
      title: 'Test title',
      attachmentsIds: ['1', '2'],
    })

    expect(result).toBeInstanceOf(Success)
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
    expect(inMemoryQuestionsRepository.items[0].attachments).toEqual([
      expect.objectContaining({ attachmentId: '1' }),
      expect.objectContaining({ attachmentId: '2' }),
    ])
  })
})
