import React, { useEffect, useState } from "react"
import API from "../api"
import InternshipForm from "../components/InternshipForm.jsx";


function Dashboard() {
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
    fetchInternships()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Internships</h1>
      <InternshipForm refresh={fetchInternships} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="mt-4">
          {internships.map((intern) => (
            <li key={intern._id} className="border p-3 mb-2 rounded bg-white">
              <h2 className="font-bold">{intern.title}</h2>
              <p>{intern.description}</p>
              <a href={intern.link} target="_blank" className="text-blue-600 underline">
                {intern.link}
              </a>
              <p>Deadline: {new Date(intern.deadline).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dashboard
