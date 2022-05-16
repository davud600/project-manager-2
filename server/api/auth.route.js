import express from 'express'
import AuthCtrl from './auth.controller.js'

const router = express.Router()

router.get('/', AuthCtrl.authenticateToken, AuthCtrl.apiGetUsers)

router.post('/signup', AuthCtrl.apiCreateUser)
router.post('/login', AuthCtrl.apiSignIn)
router.post('/logout', AuthCtrl.apiSignOut)
router.post('/token', AuthCtrl.apiToken)

export default router