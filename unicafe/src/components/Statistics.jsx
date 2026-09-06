import { useUnicafeStore } from "../store"

const Statistics = () => {
  const good = useUnicafeStore(state => state.good)
  const neutral = useUnicafeStore(state => state.neutral)
  const bad = useUnicafeStore(state => state.bad)
  const all = good + neutral + bad
  const average = (good - bad) / (good + neutral + bad) || 0
  const positive = isNaN(good / (good + neutral + bad) * 100) ? "0 %" : (good / (good + neutral + bad) * 100) + " %"

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{good}</td></tr>
          <tr><td>neutral</td><td>{neutral}</td></tr>
          <tr><td>bad</td><td>{bad}</td></tr>
          <tr><td>all</td><td>{all}</td></tr>
          <tr><td>average</td><td>{average}</td></tr>
          <tr><td>positive</td><td>{positive}</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
