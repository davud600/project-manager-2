import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import AuthDAO from '../dao/authDAO.js'

export default class AuthController {
  static async apiGetUsers(req, res) {
    const { user } = req
    res.json({ user: user })
  }

  static async apiCreateUser(req, res) {
    const { email, name, password } = req.body

    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      await AuthDAO.createUser({
        email,
        name,
        hashedPassword
      })
      res.sendStatus(200)
    } catch (e) {
      res.sendStatus(500)
      console.error(`Error ${e}`)
    }
  }

  static async apiSignIn(req, res) {
    const { name, password } = req.body

    try {
      // Get json info
      let user = await AuthDAO.getUsers({ name: name })
      user = user.find(user => user.name = name)

      // Validate user info and generate tokens
      if (user == null)
        return res.status(400).send('Could not find user')
      if (!await bcrypt.compare(password, user.password))
        return res.status(400).send('Wrong Password')

      const accessToken = AuthController.generateToken({
        user: user,
        token: process.env.ACCESS_TOKEN_SECRET,
        expires: true
      })
      const refreshToken = AuthController.generateToken({
        user: user,
        token: process.env.REFRESH_TOKEN_SECRET,
        expires: false
      })
      AuthDAO.addRefreshToken({ token: refreshToken })

      res.json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        user_id: user._id
      })
    } catch (e) {
      res.sendStatus(500)
      console.error(`Error ${e}`)
    }
  }

  static async apiSignOut(req, res) {
    let refreshTokens
    try {
      refreshTokens = await AuthDAO.getRefreshTokens()
    } catch (e) {
      res.sendStatus(500)
      console.error(`Error ${e}`)
    }

    // Remove given refresh token from collection
    AuthDAO.deleteRefreshToken({ token: req.body.token })
    res.sendStatus(204)
  }

  static async apiToken(req, res) {
    const { refreshToken } = req.body
    
    // Authorize token
    if (!refreshToken)
      return res.sendStatus(401)
    
    try {
      const refreshTokens = await AuthDAO.getRefreshTokens({ token: refreshToken })
      if (!refreshTokens[0])
        return res.sendStatus(403)
    } catch (e) {
      res.sendStatus(500)
      console.error(`Error ${e}`)
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.sendStatus(403)

      // If refresh token valid, create new access token
      const accessToken = AuthController.generateToken({
        user: {
          name: user.name,
          email: user.email,
          _id: user._id
        },
        token: process.env.ACCESS_TOKEN_SECRET,
        expires: true
      })

      res.json({ accessToken: accessToken })
    })
  }

  static generateToken({
    user,
    token,
    expires
  }) {
    const expireTime = '10m'
    return expires ? jwt.sign(user, token, { expiresIn: expireTime }):jwt.sign(user, token)
  }

  static authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if (!token)
      return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.sendStatus(403)
      
      req.user = user
      next()
    })
  }
}