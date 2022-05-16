import { ObjectId } from 'mongodb'

let projects

export default class ProjectsDAO {
  static async injectDB(conn) {
    if (projects)
      return

    try {
      projects = await conn.db(process.env.WS_DB).collection(process.env.P_C)
    } catch (e) {
      console.error(`Error: ${e}`)
    }
  }

  static async getProjects({ authenticated_user_id }) {
    let projectsList
    const query = {
      user_id: ObjectId(authenticated_user_id)
    }

    try {
      projectsList = await projects.find(query).skip(0).limit(0).toArray()
    } catch (e) {
      console.error(`Error ${e}`)
    }

    return projectsList
  }

  static async getProject({ project_id, authenticated_user_id }) {
    let projectsList
    const query = {
      _id: ObjectId(project_id)
    }

    try {
      if (!await ProjectsDAO.projectBelongsToUser({
        project_id: project_id,
        user_id: authenticated_user_id
      })) return 'error not the correct user'

      projectsList = await projects.find(query).skip(0).limit(0).toArray()
    } catch (e) {
      console.error(`Error ${e}`)
    }

    return projectsList
  }

  static async createProject({ authenticated_user_id, title }) {
    const date = Date()
    const project = {
      date: date,
      user_id: ObjectId(authenticated_user_id),
      title: title
    }

    try {
      await projects.insertOne(project)
    } catch (e) {
      console.error(`Error ${e}`)
    }
  }

  static async updateProject({ _id, title, authenticated_user_id }) {
    const date = Date()

    try {
      if (!await ProjectsDAO.projectBelongsToUser({
        project_id: _id,
        user_id: authenticated_user_id
      })) return 'error'

      await projects.updateOne({
        _id: ObjectId(_id)
      }, {
        $set: {
          title: title,
          date: date
        }
      })
    } catch (e) {
      console.error(`Error ${e}`)
    }
  }

  static async deleteProject({ _id, authenticated_user_id }) {
    try {
      if (!await ProjectsDAO.projectBelongsToUser({
        project_id: _id,
        user_id: authenticated_user_id
      })) return 'error'
      
      await projects.deleteOne({ _id: ObjectId(_id) })
    } catch (e) {
      console.error(`Error ${e}`)
    }
  }

  static async projectBelongsToUser({ project_id, user_id }) {
    let projectToReturn
    
    try {
      const projectsOfUser = await ProjectsDAO.getProjects({ authenticated_user_id: user_id })
      projectToReturn = projectsOfUser.find(project => {
        return project._id == project_id
      })
    } catch (e) {
      console.error(`Error ${e}`)
    }

    return projectToReturn || false
  }
}