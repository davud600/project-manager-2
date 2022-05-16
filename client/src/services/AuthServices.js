import { httpAuth } from "../http-common"

class AuthServices {
  logIn(doc) {
    return httpAuth.post("/login", doc)
  }

  signUp(doc) {
    return httpAuth.post("/signup", doc)
  }

  logOut(doc) {
    return httpAuth.post("/logout", doc)
  }

  getToken(doc) {
    return httpAuth.post("/token", doc)
  }
}

export default new AuthServices()