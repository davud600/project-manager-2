import ProjectsDAO from '../dao/projectsDAO.js'

export default class ProjectsController {
  static async apiGetProjects(req, res) {
    const { project_id } = req.query
    const { user } = req

    try {
      // If user_id in query get projects of that user
      // else if project_id get that project
      let projectsList = []
      if (project_id) {
        projectsList = await ProjectsDAO.getProject({
          project_id: project_id,
          authenticated_user_id: user._id
        })
      } else {
        projectsList = await ProjectsDAO.getProjects({
          authenticated_user_id: user._id
        })
      }

      res.json({ projects: projectsList })
    } catch (e) {
      res.sendStatus(500)
      console.error(`Error ${e}`)
    }
  }

  static async apiCreateProject(req, res) {
    const { title } = req.body
    const { user } = req

    try {
      await ProjectsDAO.createProject({
        authenticated_user_id: user._id,
        title: title
      })

      res.sendStatus(200)
    } catch (e) {
      res.sendStatus(500)
      console.error(`Error ${e}`)
    }
  }

  static async apiUpdateProject(req, res) {
    const { project_id } = req.query
    const { title } = req.body
    const { user } = req

    try {
      const updateProjectResult = await ProjectsDAO.updateProject({
        _id: project_id,
        title: title,
        authenticated_user_id: user._id
      })

      if (updateProjectResult == 'error') {
        console.error(`error not the correct user`)
        return res.sendStatus(400)
      }
      
      res.sendStatus(200)
    } catch (e) {
      res.sendStatus(500)
      console.error(`Error ${e}`)
    }
  }

  static async apiDeleteProject(req, res) {
    const { project_id } = req.query
    const { user } = req

    try {
      const deleteProjectResult = await ProjectsDAO.deleteProject({
        _id: project_id,
        authenticated_user_id: user._id
      })
      
      if (deleteProjectResult == 'error') {
        console.error(`error not the correct user`)
        return res.sendStatus(400)
      }

      res.sendStatus(200)
    } catch (e) {
      res.sendStatus(500)
      console.error(`Error ${e}`)
    }
  }
}