import React from 'react'
import {BrowserRouter,Route,Routes} from  "react-router-dom"
import Modal from 'react-modal';
import ListView from "./Components/ListView"
import './App.css'

const App = () => {

  Modal.setAppElement('#root');
  return (
    <div>
      <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<ListView/>}/>
    </Routes>

      </BrowserRouter>

    </div>
  )
}

export default App
