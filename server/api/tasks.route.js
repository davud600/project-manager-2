import express from 'express'
import TasksCtrl from './tasks.controller.js'
import AuthCtrl from './auth.controller.js'

const router = express.Router()

router.get('/', AuthCtrl.authenticateToken, TasksCtrl.apiGetTasksOfList)

router.post('/create-task', AuthCtrl.authenticateToken, TasksCtrl.apiCreateTask)
router.put('/update-task', AuthCtrl.authenticateToken, TasksCtrl.apiUpdateTask)
router.delete('/delete-task', AuthCtrl.authenticateToken, TasksCtrl.apiDeleteTask)

export default router