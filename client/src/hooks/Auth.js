import { useState,
  useEffect,
  useContext,
  createContext
} from "react"
import AuthServices from "../services/AuthServices"
import jwt from "jwt-decode"

const UserContext = createContext()

export function useAuth() {
  return useContext(UserContext)
}

export default function AuthProvider({ children }) {
  const [ user, setUser ] = useState({})

  const isAuthorized = async () => {
    return new Promise(async (resolve) => {
      // check if current access token valid
      const accessToken = localStorage.getItem("accessToken")
      const tokenUser = jwt(accessToken)
      resolve(Date.now() < tokenUser.exp * 1000)
    })
  }

  const authorizeUser = async () => {
    return new Promise(async (resolve, reject) => {
      if (!localStorage.getItem("refreshToken"))
        return reject("User not logged in!")
      
      const refreshToken = localStorage.getItem("refreshToken")
      let accessToken = localStorage.getItem("accessToken")
      let tokenUser = jwt(accessToken)

      if (!await isAuthorized()) {
        // get new access token
        const tokenResult = await AuthServices.getToken({
          refreshToken: refreshToken
        })
        accessToken = tokenResult.data.accessToken
        tokenUser = jwt(accessToken)
        localStorage.setItem("accessToken", accessToken)
      }

      setUser(tokenUser)
      resolve("User authorized!")
    })
  }

  const LoginUser = ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
      const userInput = {
        name: username,
        password: password
      }

      try {
        const loginResult = await AuthServices.logIn(userInput)
        localStorage.setItem("refreshToken", loginResult.data.refreshToken)
        localStorage.setItem("accessToken", loginResult.data.accessToken)

        resolve("Successfully logged in!")
      } catch (e) {
        reject(e.response.data)
      }
    })
  }

  const SignupUser = ({ username, password, confirmPassword }) => {
    return new Promise(async (resolve, reject) => {
      // validate inputs
      if (password === "" || username === "")
        reject("Invalid inputs")
      if ((password !== confirmPassword))
        reject("Passwords do not match!")

      const userInput = {
        name: username,
        password: password
      }

      try {
        await AuthServices.signUp(userInput)
        resolve("Successfully created account!")
      } catch (e) {
        reject(e.response.data)
      }
    })
  }

  const value = {
    user,
    LoginUser,
    SignupUser,
    authorizeUser
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
