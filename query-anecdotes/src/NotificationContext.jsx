import { createContext, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState("")

  const clearNotification = () => setNotification("")

  return (
    <NotificationContext.Provider value={{ notification, setNotification, clearNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}
