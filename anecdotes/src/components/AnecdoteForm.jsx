import { useAnecdoteAction } from "../store"

const AnecdoteForm = () => {
  const { create } = useAnecdoteAction()

  const addAnecdote = (e) => {
    e.preventDefault()
    create(e.target.anecdote.value)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input data-testid="new" name='anecdote' />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
