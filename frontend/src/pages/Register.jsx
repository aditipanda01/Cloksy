
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (phone && !phone.match(/^\+?[1-9]\d{1,14}$/)) {
      setError("Please enter a valid phone number with country code (e.g., +919876543210)")
      return
    }

    try {
      await API.post("/auth/register", { name, email, password, phone })
      navigate("/login")
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f5dc]"> {/* Beige background */}
      <form
        onSubmit={handleSubmit}
        className="bg-black p-8 rounded-2xl shadow-lg w-96 text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && <p className="text-red-400 text-sm mb-3 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          className="bg-transparent border border-gray-500 w-full p-3 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37] placeholder-gray-400 text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          className="bg-transparent border border-gray-500 w-full p-3 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37] placeholder-gray-400 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Phone (e.g., +919876543210)"
          className="bg-transparent border border-gray-500 w-full p-3 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37] placeholder-gray-400 text-white"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <p className="text-xs text-gray-400 mb-4">
          * Phone is required for SMS reminders
        </p>

        <button
          type="submit"
          className="bg-[#D4AF37] hover:bg-[#bfa130] text-black w-full py-3 rounded font-semibold transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
