import { Success } from '@/core/either-failure-or-success'
import { InMemoryAnswersRepository } from '@/tests/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from '../answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create a Answer', async () => {
    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Response content',
    })

    expect(result).toBeInstanceOf(Success)
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
  })
})
