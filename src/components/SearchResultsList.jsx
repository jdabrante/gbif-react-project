import React from 'react'
import "./SearchResultsList.css"
import { SearchResult } from './SearchResult'
import { Link } from "react-router-dom"

// Componente para mostrar la lista de resultados obtenidos de la búsqueda
// Se pasa como prop los resultados y el evento onSpecieClick necesario para borrar la lista de resultados una vez se clica a uno de ellos

export const SearchResultsList = ({ results, onSpecieClick }) => {
  const handleClick = (result) => {
    onSpecieClick(result)
  }

  // El resultado se mapea y para cada uno de ellos se crea un link a una ruta con su identificador o key proporcionado por la API
  // Además, cuando se selecciona un resultado se llama a la función handleClick para borrar el contenido de los resultados anteriores
  return (
    <div className='results-list'>
        {
            results.map((result, id) => {
              console.log(result)
              return (<Link to={`/specie/${result.key}`} key={id} onClick={() => handleClick(result)}>
                      <SearchResult result={result}/>
                  </Link>)
            })
        }
    </div>
  )
}
