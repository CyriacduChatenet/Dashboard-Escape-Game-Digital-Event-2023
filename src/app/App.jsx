import { useState } from 'react'
import './App.css'
import Banner from './components/Banner/Banner'
import HeroBanner from './components/HeroBanner/HeroBanner'
import Table from './components/Table/Table'
import Timer from './components/Timer/Timer'
import { useEffect } from 'react'

function App() {

  return (
    <div className="App">
        <Banner/>
        <HeroBanner/>
        <Timer session={session}/>
        <Table session={session}/>
    </div>
  )
}

export default App
