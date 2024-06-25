import { Failure, Success } from '@/core/either-failure-or-success'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from '@/tests/factories/make-question'
import { InMemoryQuestionsRepository } from '@/tests/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from '../edit-question'
import { NotAllowedError } from '../errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1')
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-1',
      questionId: newQuestion.id.toString(),
      content: 'Edited question content',
      title: 'Edited question title',
    })

    expect(result).toBeInstanceOf(Success)
    expect(inMemoryQuestionsRepository.items[0].title).toBe('Edited question title')
    expect(inMemoryQuestionsRepository.items[0].content).toBe('Edited question content')
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1')
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      questionId: newQuestion.id.toString(),
      content: 'Edited question content',
      title: 'Edited question title',
    })

    expect(result).toBeInstanceOf(Failure)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
