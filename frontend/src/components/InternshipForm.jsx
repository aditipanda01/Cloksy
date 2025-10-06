import React, { useState } from "react"
import API from "../api"

function InternshipForm({ refresh }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [link, setLink] = useState("")
  const [deadline, setDeadline] = useState("")
  const [reminderDate, setReminderDate] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description || !link || !deadline) {
      setError("Please fill all required fields")
      return
    }

    try {
      await API.post("/internships", { title, description, link, deadline, reminderDate })
      setTitle("")
      setDescription("")
      setLink("")
      setDeadline("")
      setReminderDate("")
      setError("")
      refresh()
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to add internship")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-black text-white p-6 rounded-2xl shadow-lg space-y-4 mb-6">
      <h2 className="text-xl font-bold text-[#D4AF37]">Add Internship</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 rounded border border-[#D4AF37] bg-black text-white"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        className="w-full p-2 rounded border border-[#D4AF37] bg-black text-white"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        type="url"
        placeholder="Link"
        className="w-full p-2 rounded border border-[#D4AF37] bg-black text-white"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
      />

      <div className="flex flex-col sm:flex-row sm:gap-4">
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1 text-[#D4AF37]">Deadline</label>
          <input
            type="date"
            className="w-full p-2 rounded border border-[#D4AF37] bg-black text-white"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        <div className="flex-1 mt-2 sm:mt-0">
          <label className="block text-sm font-semibold mb-1 text-[#D4AF37]">Reminder Date</label>
          <input
            type="date"
            className="w-full p-2 rounded border border-[#D4AF37] bg-black text-white"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-[#D4AF37] text-black px-4 py-2 rounded-full font-semibold hover:bg-[#bfa130] transition"
      >
        Add Internship
      </button>
    </form>
  )
}

export default InternshipForm
