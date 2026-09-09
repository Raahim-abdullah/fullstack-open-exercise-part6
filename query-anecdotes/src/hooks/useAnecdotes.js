import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import { createAnecdote, getAnecdotes, updateAnecdote } from "../request"
import useNotification from "./useNotification"

export const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const { setNotification, clearNotification } = useNotification()

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: async () => await getAnecdotes()
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"])
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote))
      setNotification(`anecdote ${newAnecdote.content} created`)
      setTimeout(() => {
        clearNotification()
      }, 5000)
    },
    onError: (error) => {
      setNotification(`${error.message}`)
      setTimeout(() => {
        clearNotification()
      }, 5000)
    }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"])
      queryClient.setQueryData(["anecdotes"], anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a))
      setNotification(`anecdote ${updatedAnecdote.content} voted`)
      setTimeout(() => {
        console.log(`anecdote ${updatedAnecdote.content} voted`)
        clearNotification()
      }, 5000)
    }
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    isSuccess: result.isSuccess,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    vote: (anecdote) => updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }
}
