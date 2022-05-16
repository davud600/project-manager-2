import { ObjectId } from 'mongodb'
import ProjectsDAO from './projectsDAO.js'

let lists

export default class ListsDAO {
  static async injectDB(conn) {
    if (lists)
      return

    try {
      lists = await conn.db(process.env.WS_DB).collection(process.env.TL_C)
    } catch (e) {
      console.error(`Error: ${e}`)
    }
  }
  
  static async getList({ _id }) {
    let list
    
    try {
      list = await lists
        .find({ _id: ObjectId(_id) })
        .skip(0).limit(0).toArray()
    } catch (e) {
      console.error(`Error ${e}`)
    }

    return list
  }

  static async getLists({ project_id, authenticated_user_id }) {
    let listsList

    try {
      if (!await ProjectsDAO.projectBelongsToUser({
        project_id: project_id,
        user_id: authenticated_user_id
      })) return 'error'
      
      listsList = await lists
        .find({ project_id: ObjectId(project_id) })
        .skip(0).limit(0).toArray()
    } catch (e) {
      console.error(`Error: ${e}`)
    }

    return listsList
  }

  static async createList({ project_id, title, authenticated_user_id }) {
    const date = Date()
    const list = {
      date: date,
      project_id: ObjectId(project_id),
      title: title
    }

    try {
      if (!await ProjectsDAO.projectBelongsToUser({
        project_id: project_id,
        user_id: authenticated_user_id
      })) return 'error'

      await lists.insertOne(list)
    } catch (e) {
      console.error(`Error ${e}`)
    }
  }

  static async updateList({ _id, title, authenticated_user_id }) {
    const date = Date()

    try {
      if (!await ListsDAO.listBelongsToUser({
        list_id: _id,
        user_id: authenticated_user_id
      })) return 'error'
      
      await lists.updateOne({
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

  static async deleteList({ _id, authenticated_user_id }) {
    try {
      if (!await ListsDAO.listBelongsToUser({
        list_id: _id,
        user_id: authenticated_user_id
      })) return 'error'

      await lists.deleteOne({ _id: ObjectId(_id) })
    } catch (e) {
      console.error(`Error ${e}`)
    }
  }

  static async listBelongsToUser({ list_id, user_id }) {
    try {
      const listProject = await ListsDAO.getList({ _id: list_id })
      const project_id = listProject[0].project_id.toString()

      if (!await ProjectsDAO.projectBelongsToUser({
        project_id: project_id,
        user_id: user_id
      })) return false
    } catch (e) {
      console.error(`Error ${e}`)
    }

    return true
  }
}