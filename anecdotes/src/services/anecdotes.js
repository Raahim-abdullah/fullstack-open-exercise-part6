const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error("failed to fetch anecdotes")
  }

  return await response.json()
}

const create = async (content) => {
  const options = {
    method: "POST",
    Headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, votes: 0 })
  }

  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error("failed to create new anecdote")
  }

  return await response.json()
}

export default {
  getAll,
  create
}
