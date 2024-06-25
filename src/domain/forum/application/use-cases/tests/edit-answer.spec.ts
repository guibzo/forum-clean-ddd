import { Failure, Success } from '@/core/either-failure-or-success'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from '@/tests/factories/make-answer'
import { InMemoryAnswersRepository } from '@/tests/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from '../edit-answer'
import { NotAllowedError } from '../errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1')
    )

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-1',
      answerId: newAnswer.id.toString(),
      content: 'Edited answer content',
    })

    expect(inMemoryAnswersRepository.items[0].content).toBe('Edited answer content')
    expect(result).toBeInstanceOf(Success)
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1')
    )

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-2',
      answerId: newAnswer.id.toString(),
      content: 'Edited answer content',
    })

    expect(result).toBeInstanceOf(Failure)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
