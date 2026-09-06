import { useAnecdoteAction, useAnecdotes } from "../store"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote, remove } = useAnecdoteAction()


  const hanleDelete = async (id) => {
    await remove(id)
  }
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
            {anecdote.votes === 0 && (<button onClick={() => hanleDelete(anecdote.id)}>delete</button>)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
