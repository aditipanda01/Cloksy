import React, { useState } from "react"
import API from "../api"

function InternshipForm({ refresh }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [link, setLink] = useState("")
  const [deadline, setDeadline] = useState("")
  const [reminderDate, setReminderDate] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await API.post("/internships", { title, description, link, deadline, reminderDate })
      setTitle("")
      setDescription("")
      setLink("")
      setDeadline("")
      setReminderDate("")
      refresh()
    } catch (err) {
      console.error("Failed to add internship", err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-bold mb-2">Add Internship</h2>
      <input
        type="text"
        placeholder="Title"
        className="border w-full p-2 mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        className="border w-full p-2 mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Link"
        className="border w-full p-2 mb-2"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
      />
      <input
        type="date"
        className="border w-full p-2 mb-2"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <input
        type="date"
        className="border w-full p-2 mb-2"
        value={reminderDate}
        onChange={(e) => setReminderDate(e.target.value)}
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
    </form>
  )
}

export default InternshipForm
