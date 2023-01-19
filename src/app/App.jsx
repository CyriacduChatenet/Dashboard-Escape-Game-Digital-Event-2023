import './App.css'
import Banner from './components/Banner/Banner'
import HeroBanner from './components/HeroBanner/HeroBanner'
import Table from './components/Table/Table'
import Timer from './components/Timer/Timer'

function App() {

  return (
    <div className="App">
      <Banner />
      <HeroBanner/>
      <Timer/>
      <Table/>
    </div>
  )
}

export default App
