import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function App() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div>
      <nav className="bg-blue-600 text-white p-4 flex justify-between">
        <Link to="/" className="font-bold">Internship Reminder</Link>
        <div>
          {localStorage.getItem("token") ? (
            <button onClick={logout} className="ml-4 bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="ml-4">Login</Link>
              <Link to="/register" className="ml-4">Register</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
