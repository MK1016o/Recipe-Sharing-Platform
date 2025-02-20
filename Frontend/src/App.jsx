import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Add from './components/Add.jsx'
import Search from './components/Search.jsx'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>
          <Route path='/add' element={<Add></Add>}></Route>
          <Route path='/search' element={<Search></Search>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
