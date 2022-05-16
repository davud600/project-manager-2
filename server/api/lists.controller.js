import ListsDAO from '../dao/listsDAO.js'

export default class ListsController {
  static async apiGetListsOfProject(req, res) {
    const { project_id } = req.query
    const { user } = req

    try {
      const listsList = await ListsDAO.getLists({
        project_id: project_id,
        authenticated_user_id: user._id
      })

      if (listsList == 'error') {
        console.error('error not the correct user')
        return res.sendStatus(400)
      }

      res.json({ lists: listsList })
    } catch (e) {
      res.sendStatus(500)
      console.error(`Error ${e}`)
    }
  }

  static async apiCreateList(req, res) {
    const { project_id, title } = req.body
    const { user } = req

    try {
      const createListResult = await ListsDAO.createList({
        project_id: project_id,
        title: title,
        authenticated_user_id: user._id
      })

      if (createListResult == 'error') {
        console.error('error not the correct user')
        return res.sendStatus(400)
      }

      res.sendStatus(200)
    } catch (e) {
      res.sendStatus(500)
      console.error(`Error ${e}`)
    }
  }

  static async apiUpdateList(req, res) {
    const { list_id } = req.query
    const { title } = req.body
    const { user } = req

    try {
      const updateListResult = await ListsDAO.updateList({
        _id: list_id,
        title: title,
        authenticated_user_id: user._id
      })

      if (updateListResult == 'error') {
        console.error(`error not the correct user`)
        return res.sendStatus(400)
      }
      
      res.sendStatus(200)
    } catch (e) {
      res.status(500)
      console.error(`Error ${e}`)
    }
  }

  static async apiDeleteList(req, res) {
    const { list_id } = req.query
    const { user } = req

    try {
      const deleteListResult = await ListsDAO.deleteList({
        _id: list_id,
        authenticated_user_id: user._id
      })

      if (deleteListResult == 'error') {
        console.error(`error not the correct user`)
        return res.sendStatus(400)
      }

      res.sendStatus(200)
    } catch (e) {
      res.status(500)
      console.error(`Error ${e}`)
    }
  }
}