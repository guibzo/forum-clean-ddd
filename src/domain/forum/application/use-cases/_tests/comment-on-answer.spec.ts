import { makeAnswer } from '@/tests/factories/make-answer'
import { InMemoryAnswerCommentsRepository } from '@/tests/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from '@/tests/repositories/in-memory-answers-repository'
import { CommentOnAnswerUseCase } from '../comment-on-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Create answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()

    sut = new CommentOnAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerCommentsRepository)
  })

  it('should be able to comment on a answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comment content',
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual('Comment content')
  })
})
