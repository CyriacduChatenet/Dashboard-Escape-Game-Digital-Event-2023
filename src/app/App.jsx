import { useState } from 'react'
import { useEffect } from 'react'
import SessionRepository from '../setup/services/sesssions.service'
import './App.css'
import Banner from './components/Banner/Banner'
import HeroBanner from './components/HeroBanner/HeroBanner'
import Table from './components/Table/Table'
import Timer from './components/Timer/Timer'

import { useEffect } from 'react'

import AirtableConnect from '../services/airtable/airtableConnect'

const { AirtableData } = AirtableConnect

function App() {
  const [sessions, setSessions] = useState([]);
  const sessionService = new SessionRepository;

  useEffect(() => {
    sessionService.getAll(setSessions);
  }, [])

  return (
    <div className="App">
        <Banner/>
        <HeroBanner/>
        <Timer/>
        <Table sessions={sessions}/>
    </div>
  )
}

export default App
