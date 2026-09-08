import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './hocks/useAnecdotes'

const App = () => {
  const { isPending, isError, isSuccess, anecdotes, vote: updateAnecdoteMutation } = useAnecdotes()

  const handleVote = (anecdote) => {
    updateAnecdoteMutation(anecdote)
  }

  return (
    <div>
      {
        isPending ? (
          <div>loading data...</div>
        ) : (
          <>
            {isError ? (<div>anecdote service is not available due to problem in server</div>
            ) : null}

            {isSuccess ? (
              <div>
                <h3>Anecdote app</h3>

                <Notification />
                <AnecdoteForm />

                {anecdotes.map((anecdote) => (
                  <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                      has {anecdote.votes}
                      <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </>
        )
      }
    </div>
  )
}

export default App

