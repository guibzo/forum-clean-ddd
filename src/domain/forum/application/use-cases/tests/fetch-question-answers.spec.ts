import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from '@/tests/factories/make-answer'
import { InMemoryAnswersRepository } from '@/tests/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from '../fetch-question-answers'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Get question by slug', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      })
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      })
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      })
    )

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 0; i <= 21; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID('question-1'),
        })
      )
    }

    const { answers } = await sut.execute({
      page: 2,
      questionId: 'question-1',
    })

    expect(answers).toHaveLength(2)
  })
})
