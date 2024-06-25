import { Failure, Success } from '@/core/either-failure-or-success'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from '@/tests/factories/make-question'
import { InMemoryQuestionsRepository } from '@/tests/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from '../delete-question'
import { NotAllowedError } from '../errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question by id', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1')
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
    })

    expect(result).toBeInstanceOf(Success)
    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1')
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-2',
    })

    expect(result).toBeInstanceOf(Failure)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
