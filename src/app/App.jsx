import { useState } from 'react'
import './App.css'
import Banner from './components/Banner/Banner'
import HeroBanner from './components/HeroBanner/HeroBanner'
import Table from './components/Table/Table'
import Timer from './components/Timer/Timer'

import AirtableConnect from '../services/airtable/airtableConnect'
import { useEffect } from 'react'

const { AirtableData } = AirtableConnect

function App() {
  const sessionData = new AirtableData("Session")
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    setInterval(() => {
      callDate()
    }, 1000)
  },[])

  const callDate = () => {
    sessionData.read((data) => {
      setSessions(data)
    })
  }

  return (
    <div className="App">
      {sessions.length > 0 &&
      <>
        <Banner/>
        <HeroBanner/>
        <Timer session={sessions}/>
        <Table sessions={sessions}/>
      </>
      }
    </div>
  )
}

export default App
