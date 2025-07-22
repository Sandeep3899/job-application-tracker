import React, { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [applications, setApplications] = useState([])

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching data:', error.message)
    } else {
      setApplications(data)
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Job Applications</h1>
      <ul>
        {applications.map((app) => (
          <li key={app.id}>
            <strong>{app.company_name}</strong> – {app.job_title} ({app.status})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

