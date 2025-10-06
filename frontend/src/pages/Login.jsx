
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const res = await API.post("/auth/login", { email, password })
      if (res.data.token) {
        localStorage.setItem("token", res.data.token)
        navigate("/")
      } else {
        setError("No token received from server")
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Please check your credentials.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f5dc]"> {/* Beige background */}
      <form
        onSubmit={handleSubmit}
        className="bg-black p-8 rounded-2xl shadow-lg w-96 text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="bg-transparent border border-gray-500 w-full p-3 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37] placeholder-gray-400 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="bg-transparent border border-gray-500 w-full p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37] placeholder-gray-400 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-[#D4AF37] hover:bg-[#bfa130] text-black w-full py-3 rounded font-semibold transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
