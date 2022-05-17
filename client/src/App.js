import { Routes, Route } from "react-router-dom"

import Home from "./components/home/Home"
import Dashboard from "./components/home/Dashboard"
import Account from "./components/user/Account"
import Login from "./components/user/Login"
import Signup from "./components/user/Signup"
import Project from "./components/home/Project"
import AuthProvider from "./hooks/Auth"
import ProjectsProvider from "./hooks/documents/ProjectsProvider"

export default function App() {
  return (
    <AuthProvider>
      <ProjectsProvider>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/project" element={<Project />} />
        </Routes>
      </ProjectsProvider>
    </AuthProvider>
  )
}

