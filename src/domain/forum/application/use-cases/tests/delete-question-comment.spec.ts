import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestionComment } from '@/tests/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from '@/tests/repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentUseCase } from '../delete-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete question comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to delete a question comment by id', async () => {
    const newQuestion = makeQuestionComment(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-comment-1')
    )

    await inMemoryQuestionCommentsRepository.create(newQuestion)

    await sut.execute({
      questionCommentId: 'question-comment-1',
      authorId: 'author-1',
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question comment from another user', async () => {
    const newQuestion = makeQuestionComment(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-comment-1')
    )

    await inMemoryQuestionCommentsRepository.create(newQuestion)

    expect(async () => {
      await sut.execute({
        questionCommentId: 'question-comment-1',
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
