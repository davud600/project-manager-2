let users
let refreshTokens

export default class AuthDAO {
  static async injectDB(conn) {
    if (users)
      return

    try {
      users = await conn.db(process.env.WS_DB).collection(process.env.U_C)
      refreshTokens = await conn.db(process.env.WS_DB).collection(process.env.RT_C)
    } catch (e) {
      console.error(`Error: ${e}`)
    }
  }

  static async getUsers(query = null) {
    let usersList = []

    try {
      usersList = await users.find(query).skip(0).limit(0).toArray()
    } catch (e) {
      console.error(`Error: ${e}`)
    }

    return usersList
  }

  static async createUser({ email, name, hashedPassword }) {
    const date = Date()
    const user = {
      date: date,
      email: email,
      name: name,
      password: hashedPassword
    }

    try {
      await users.insertOne(user)
    } catch (e) {
      console.error(`Error: ${e}`)
    }
  }

  static async getRefreshTokens(query = null) {
    let refreshTokensList = []

    try {
      refreshTokensList = await refreshTokens.find(query).skip(0).limit(0).toArray()
    } catch (e) {
      console.error(`Error: ${e}`)
    }

    return refreshTokensList
  }

  static async addRefreshToken({ token }) {
    const date = Date()
    const refreshToken = {
      date: date,
      token: token
    }

    try {
      await refreshTokens.insertOne(refreshToken)
    } catch (e) {
      console.error(`Error: ${e}`)
    }
  }

  static async deleteRefreshToken(query) {
    try {
      await refreshTokens.deleteOne(query)
    } catch (e) {
      console.error(`Error: ${e}`)
    }
  }
}
