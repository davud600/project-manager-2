import express from 'express'
import ProjectsCtrl from './projects.controller.js'
import AuthCtrl from './auth.controller.js'

const router = express.Router()

router.get('/', AuthCtrl.authenticateToken, ProjectsCtrl.apiGetProjects)

router.post('/create-project', AuthCtrl.authenticateToken, ProjectsCtrl.apiCreateProject)
router.put('/update-project', AuthCtrl.authenticateToken, ProjectsCtrl.apiUpdateProject)
router.delete('/delete-project', AuthCtrl.authenticateToken, ProjectsCtrl.apiDeleteProject)

export default router