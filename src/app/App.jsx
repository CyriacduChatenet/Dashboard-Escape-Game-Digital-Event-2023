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
  const [session, setSession] = useState([])

  useEffect(() => {
    sessionData.read((data) => {
      setInterval(() => {
        setSession(data)

      }, 1000)
    })
  },[])

  return (
    <div className="App">
      {session
      ? <>
        <Banner/>
        <HeroBanner/>
        <Timer session={session}/>
        <Table session={session}/>
      </>
      : null
      }
    </div>
  )
}

export default App
