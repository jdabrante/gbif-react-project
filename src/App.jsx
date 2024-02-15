import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './App.css'
import { SearchBar } from './components/SearchBar'
import { SearchResultsList } from './components/SearchResultsList'
import { SpecieDetail } from "./components/SpecieDetail"
import Ecosystem from "./components/svg/Ecosystem.gif"
import { RiArrowGoBackFill } from "react-icons/ri";

export default function App() {
  
  // Hook que se va a utilizar para setear los resultados obtenidos de la búsqueda
  const [results, setResults] = useState([])

  // Función para borrar los resultados cuando se acceda al detelle de uno de estos
  const handleResultClick = (result) => {
    setResults([])
  }

  return (
    // Creación de las rutas así como definición de los elementos que van a aparecer en las mismas
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={
            <>
            <div className='search-bar-container'>
              <SearchBar setResults={setResults}/>
              <SearchResultsList results={results} onSpecieClick={handleResultClick}/>
            </div>
            <div className='index-image'>
              <img src={Ecosystem} alt="" />
            </div>
            </>
          } />
          <Route path='specie/:id' element={
          <>
          <div className='search-bar-container'>
              <SearchBar setResults={setResults}/>
              <SearchResultsList results={results} />
          </div>
              <Link to={'/'}>
                <RiArrowGoBackFill id="go-back-icon"/>
              </Link>
          <div className='detail-container'>
            <SpecieDetail onClick={handleResultClick}/>
          </div>
          </>
          }/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

