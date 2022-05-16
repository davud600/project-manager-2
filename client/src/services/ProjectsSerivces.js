import { httpProjects } from '../http-common'

class ProjectsServices {
  getProjects() {
    const accessToken = localStorage.getItem("accessToken")
    const headers = {
      'Authorization': `Bearer ${accessToken || ""}`
    }

    return httpProjects.get('',
    {
      headers: headers
    })
  }

  getProject(project_id) {
    const accessToken = localStorage.getItem("accessToken")
    const headers = {
      'Authorization': `Bearer ${accessToken || ""}`
    }
    
    return httpProjects.get(`?project_id=${project_id}`,
    {
      headers: headers
    })
  }

  createProject(doc) {
    const accessToken = localStorage.getItem("accessToken")
    const headers = {
      'Authorization': `Bearer ${accessToken || ""}`
    }
    
    return httpProjects.post('/create-project',
      doc,
      {
        headers: headers
      }
    )
  }

  updateProject(project_id, doc) {
    const accessToken = localStorage.getItem("accessToken")
    const headers = {
      'Authorization': `Bearer ${accessToken || ""}`
    }
    
    return httpProjects.put(`/update-project?project_id=${project_id}`,
      doc,
      {
        headers: headers
      }
    )
  }

  deleteProject(project_id) {
    const accessToken = localStorage.getItem("accessToken")
    const headers = {
      'Authorization': `Bearer ${accessToken || ""}`
    }
    
    return httpProjects.delete(`/delete-project?project_id=${project_id}`,
    {
      headers: headers
    })
  }
}

export default new ProjectsServices()