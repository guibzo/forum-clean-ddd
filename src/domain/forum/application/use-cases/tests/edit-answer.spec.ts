import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from '@/tests/factories/make-answer'
import { InMemoryAnswersRepository } from '@/tests/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from '../edit-answer'

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

    await sut.execute({
      authorId: 'author-1',
      answerId: newAnswer.id.toString(),
      content: 'Edited answer content',
    })

    expect(inMemoryAnswersRepository.items[0].content).toBe('Edited answer content')
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1')
    )

    await inMemoryAnswersRepository.create(newAnswer)

    expect(async () => {
      await sut.execute({
        authorId: 'author-2',
        answerId: newAnswer.id.toString(),
        content: 'Edited answer content',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
