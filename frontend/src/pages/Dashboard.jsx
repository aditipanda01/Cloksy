import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api"
import InternshipForm from "../components/InternshipForm.jsx"
import { Bell } from "lucide-react"

function Dashboard() {
  const navigate = useNavigate()
  const [internships, setInternships] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchInternships = async () => {
    try {
      const res = await API.get("/internships")
      setInternships(res.data)
    } catch (err) {
      console.error("Failed to fetch internships:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }
    fetchInternships()
  }, [navigate])

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-[#f5f5dc] flex flex-col">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-black text-[#f5f5dc] p-4 shadow-lg z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold text-[#D4AF37]">ProMinder</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/settings")}
              className="text-[#f5f5dc] hover:text-[#D4AF37] transition font-medium"
            >
              Settings
            </button>
            <button
              onClick={logout}
              className="bg-[#D4AF37] text-black px-4 py-2 rounded-full hover:bg-[#bfa130] transition font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content with top padding to account for fixed navbar */}
      <div className="pt-24 max-w-5xl mx-auto p-8 bg-white text-black rounded-2xl shadow-lg w-full mt-6 mb-8">
        <h1 className="text-3xl font-bold mb-6 text-[#D4AF37] text-center">
          My Internships
        </h1>

        <InternshipForm refresh={fetchInternships} />

        {loading ? (
          <p className="mt-4 text-gray-700 text-center">Loading...</p>
        ) : internships.length === 0 ? (
          <p className="mt-4 text-gray-600 text-center">
            No internships added yet.
          </p>
        ) : (
          <ul className="mt-6 space-y-4">
            {internships.map((intern) => (
              <li
                key={intern._id}
                className="border border-[#D4AF37] p-4 rounded-lg bg-[#f9f9f0] shadow-md"
              >
                <h2 className="font-bold text-xl text-[#D4AF37]">
                  {intern.title}
                </h2>
                <p className="text-black mt-1">{intern.description}</p>
                <a
                  href={intern.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] underline hover:text-[#bfa130] mt-2 inline-block"
                >
                  {intern.link}
                </a>
                <p className="text-gray-800 mt-2">
                  Deadline:{" "}
                  <span className="font-semibold">
                    {new Date(intern.deadline).toLocaleDateString()}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Dashboard