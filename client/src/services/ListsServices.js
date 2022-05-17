import { httpLists } from '../http-common'

class ListsServices {
  getLists(proejct_id) {
    const accessToken = localStorage.getItem("accessToken")
    const headers = {
      'Authorization': `Bearer ${accessToken || ""}`
    }

    return httpLists.get(`?project_id=${proejct_id}`,
    {
      headers: headers
    })
  }

  createList(doc) {
    const accessToken = localStorage.getItem("accessToken")
    const headers = {
      'Authorization': `Bearer ${accessToken || ""}`
    }
    
    return httpLists.post('/create-list',
      doc,
      {
        headers: headers
      }
    )
  }

  updateList(list_id, doc) {
    const accessToken = localStorage.getItem("accessToken")
    const headers = {
      'Authorization': `Bearer ${accessToken || ""}`
    }
    
    return httpLists.put(`/update-list?list_id=${list_id}`,
      doc,
      {
        headers: headers
      }
    )
  }

  deleteList(list_id) {
    const accessToken = localStorage.getItem("accessToken")
    const headers = {
      'Authorization': `Bearer ${accessToken || ""}`
    }
    
    return httpLists.delete(`/delete-list?list_id=${list_id}`,
    {
      headers: headers
    })
  }
}

export default new ListsServices()