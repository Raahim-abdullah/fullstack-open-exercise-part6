import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './request'

const App = () => {
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: async () => {
      return await getAnecdotes()
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const anecdotes = result.data

  return (
    <div>
      {
        result.isPending ? (
          <div>loading data...</div>
        ) : (
          <>
            {result.isError ? (
              <div>anecdote service is not available due to problem in server</div>
            ) : null}

            {result.isSuccess ? (
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
