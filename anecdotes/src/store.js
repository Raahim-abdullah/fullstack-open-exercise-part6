import { create } from 'zustand'
import anecdoteService from './services/anecdotes'


const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: "",
  actions: {
    vote: async anecdote => {
      const voted = await anecdoteService.vote(anecdote)
      set(state => ({
        anecdotes: state.anecdotes.map(a =>
          a.id === voted.id ? voted : a)
      }))
      useNotificationStore.getState().actions.setMessage(`you voted '${voted.content}'`)
      setTimeout(() => {
        useNotificationStore.getState().actions.setMessage('')
      }, 3000)
    },
    create: async content => {
      const newAnecdote = await anecdoteService.create(content)
      set(state => ({
        anecdotes: state.anecdotes.concat(newAnecdote)
      }))
      useNotificationStore.getState().actions.setMessage(`you created '${newAnecdote.content}'`)
      setTimeout(() => {
        useNotificationStore.getState().actions.setMessage('')
      }, 3000)
    },
    setFilter: value => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    }
  },
}))

const useNotificationStore = create(set => ({
  message: "",
  actions: {
    setMessage: message => set(() => ({ message }))
  }
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const filter = useAnecdoteStore(state => state.filter)
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())).toSorted((a, b) => b.votes - a.votes)
}
export const useAnecdoteAction = () => useAnecdoteStore((state) => state.actions)
export const useMessage = () => useNotificationStore((state) => state.message)
export const useMessageAction = () => useNotificationStore((state) => state.actions)
