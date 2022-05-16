import express from 'express'
import ListsCtrl from './lists.controller.js'
import AuthCtrl from './auth.controller.js'

const router = express.Router()

router.get('/', AuthCtrl.authenticateToken, ListsCtrl.apiGetListsOfProject)

router.post('/create-list', AuthCtrl.authenticateToken, ListsCtrl.apiCreateList)
router.put('/update-list', AuthCtrl.authenticateToken, ListsCtrl.apiUpdateList)
router.delete('/delete-list', AuthCtrl.authenticateToken, ListsCtrl.apiDeleteList)

export default router