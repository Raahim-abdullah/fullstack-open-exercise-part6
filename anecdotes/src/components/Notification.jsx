import { useMessage } from "../store"

const Notification = () => {
  const message = useMessage()
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }

  if (!message) return null
  return (
    <div style={style} data-testid="notification">
      {message}
    </div>
  )
}

export default Notification
