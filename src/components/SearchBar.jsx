import React, {useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import './SearchBar.css'

export const SearchBar = ({ setResults }) => {
    const baseURL = 'https://api.gbif.org/v1/species/suggest?datasetKey=d7dddbf4-2cf0-4f39-9b2a-bb099caae36c&q='
    const [input, setInput] = useState("")

    const fetchData = (value) => {
        let query = encodeURIComponent(value)
        fetch(`${baseURL}${query}`)
        .then(response => response.json())
        .then(data => {
            const results = data.filter((specie) => {
                return value && specie && specie.scientificName && specie.scientificName.toLowerCase().includes(value.toLowerCase())
            })
            setResults(results)
        })
    }

    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

  return (
    <div className='input-wrapper'>
        <FaSearch  id='search-icon'/>
        <input type="text" placeholder='Type to search...' value={input} onChange={(e) => handleChange(e.target.value)}/>
    </div>
  )
}
