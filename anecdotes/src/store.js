import { create } from 'zustand'
import anecdoteService from './services/anecdotes'


const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: "",
  actions: {
    vote: id => set(state => ({
      anecdotes: state.anecdotes.map(a =>
        a.id === id ? { ...a, votes: a.votes + 1 } : a)
    })
    ),
    create: async content => {
      const newAnecdote = await anecdoteService.create(content)
      set(state => ({
        anecdotes: state.anecdotes.concat(newAnecdote)
      }))
    },
    setFilter: value => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    }
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const filter = useAnecdoteStore(state => state.filter)
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())).toSorted((a, b) => b.votes - a.votes)
}
export const useAnecdoteAction = () => useAnecdoteStore((state) => state.actions)
