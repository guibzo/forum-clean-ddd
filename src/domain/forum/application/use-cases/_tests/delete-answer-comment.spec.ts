import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from '@/tests/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from '@/tests/repositories/in-memory-answer-comments-repository'
import { DeleteAnswerCommentUseCase } from '../delete-answer-comment'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete answer comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete a answer comment by id', async () => {
    const newAnswer = makeAnswerComment(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-comment-1')
    )

    await inMemoryAnswerCommentsRepository.create(newAnswer)

    await sut.execute({
      answerCommentId: 'answer-comment-1',
      authorId: 'author-1',
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer comment from another user', async () => {
    const newAnswer = makeAnswerComment(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-comment-1')
    )

    await inMemoryAnswerCommentsRepository.create(newAnswer)

    expect(async () => {
      await sut.execute({
        answerCommentId: 'answer-comment-1',
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
