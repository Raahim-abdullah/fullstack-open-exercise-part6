import { useAnecdoteAction } from "../store"

const Filter = () => {
  const { setFilter } = useAnecdoteAction()

  const handleChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter

