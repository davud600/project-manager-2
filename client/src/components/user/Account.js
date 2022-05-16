import { useState, useEffect } from "react"
import Header from "../Header"
import { useAuth } from "../../hooks/Auth"

export default function Account() {
  const { user, authorizeUser } = useAuth()

  useEffect(() => {
    authorizeUser()
  }, [])

  return (
    <div>
      <Header />
      Account {user.name}
    </div>
  )
}
