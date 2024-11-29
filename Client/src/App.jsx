
import './App.css'
import Navbar from './components/constantfile/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './components/contents/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'

function App() {


  return (
    <>

      <div className='max-w-7xl mx-auto'>
        <Navbar />
        <div>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </div>

    </>
  )
}

export default App
