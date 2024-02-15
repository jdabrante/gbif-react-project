import React, {useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import './SearchBar.css'

//  Componente de la barrada de búsqueda
//  Se añade como prop el setResults que se ha creado en el Appd para que pueda setear los resultados

export const SearchBar = ({ setResults }) => {

    // URL de la API de GBIF para la búsqueda de especies por nombre científico ( se puede usar el género y epíteto específico. En algunos casos también el autor y año de publicación)
    // enlace a la API : https://techdocs.gbif.org/en/openapi/
    const baseURL = 'https://api.gbif.org/v1/species/suggest?datasetKey=d7dddbf4-2cf0-4f39-9b2a-bb099caae36c&q='

    // Hook para setear el input de búsqueda
    const [input, setInput] = useState("")

    // Función que realiza el fetch. Se le pasa un value que será el input introducido en la barra de búsqueda
    const fetchData = (value) => {
        // Es necesario formatear el string para que tome el formato de una query dentro de una URL
        let query = encodeURIComponent(value)
        fetch(`${baseURL}${query}`)
        .then(response => response.json())
        .then(data => {
            // El filter comprueba que los datos devueltos cumplan con una serie de requisitos
            const results = data.filter((specie) => {
                return value && specie && specie.scientificName && specie.scientificName.toLowerCase().includes(value.toLowerCase())
            })
            // Se setean los resultados ( Este Hook se encuentra en App )
            setResults(results)
        })
    }

    // Función para setear el input y a continuación realizar el fetch
    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

  return (
    // En el input se introduce como valor el input que se ha seteado y a continuación se define un evento onChange que pasará el input actual a la función 
    // handleChange que hemos definido antes
    <div className='input-wrapper'>
        <FaSearch  id='search-icon'/>
        <input type="text" placeholder='Type to search...' value={input} onChange={(e) => handleChange(e.target.value)}/>
    </div>
  )
}
