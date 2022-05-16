import axios from "axios"

export const httpAuth = axios.create({
  baseURL: "http://localhost:7000/api/v1/auth",
  headers: {
    "Content-type": "application/json"
  }
})

export const httpProjects = axios.create({
  baseURL: "http://localhost:5000/api/v1/projects",
  headers: {
    "Content-type": "application/json"
  }
})

export const httpLists = axios.create({
  baseURL: "http://localhost:5000/api/v1/lists",
  headers: {
    "Content-type": "application/json"
  }
})

export const httpTasks = axios.create({
  baseURL: "http://localhost:5000/api/v1/tasks",
  headers: {
    "Content-type": "application/json"
  }
})
