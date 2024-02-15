import React from 'react'
import "./SearchResult.css"

// Componente que toma como prop un resultado específico de la lista de resultados y rendereiza el nombre científico de la especie
export const SearchResult = ({result}) => {
  return (
    <div className='search-result'>{result.scientificName}</div>
  )
}
