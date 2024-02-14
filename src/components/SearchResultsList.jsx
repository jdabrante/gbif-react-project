import React from 'react'
import "./SearchResultsList.css"
import { SearchResult } from './SearchResult'
import { Link } from "react-router-dom"

export const SearchResultsList = ({ results, onSpecieClick }) => {
  const handleClick = (result) => {
    onSpecieClick(result)
  }

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
