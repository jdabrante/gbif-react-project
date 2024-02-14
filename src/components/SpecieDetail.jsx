import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MapView from './Map'
import "./SpecieDetail.css"
import loading from './svg/loading.svg'

export const SpecieDetail = () => {
  const [specie, setSpecie] = useState({})
  const [image, setImage] = useState({})
  const [loadingGif, setLoadingGif] = useState(false)

  const params = useParams()
  const DataURL = 'https://api.gbif.org/v1/species/match?usageKey='
  const ImageURL = 'https://api.gbif.org/v1/occurrence/search?taxonKey=5&mediaType=StillImage&limit=300'

  useEffect(() => {
    fetch(`${DataURL}${params.id}`)
    .then(result => result.json())
    .then(data => {
      setSpecie(data)
    })
  }, [])

  useEffect(() => {
    setLoadingGif(true)
    fetch(`https://api.gbif.org/v1/occurrence/search?taxonKey=${params.id}&mediaType=StillImage&limit=300`)
    .then(result => result.json())
    .then(data => {
      setImage(data.results[0].media[0].identifier)
      setLoadingGif(false)
    })
  }, [])



  return (
    <>
    <div className='specie-data'>
      <div className='specie-taxonomy'> 
        <p>Kingdom: {specie.kingdom}</p>
        <p>Phylum: {specie.phylum}</p>
        <p>Class: {specie.class}</p>
        <p>Order: {specie.order}</p>
        <p>Family: {specie.family}</p>
        <p>Genus: {specie.genus}</p>
        <p>Scientific name: {specie.scientificName}</p>
        <p>Canonical name: {specie.canonicalName}</p>
        <div className='image-super-container'>
          <div className='image-container'>
            {loadingGif && <img src={loading} />}
            <img src={image} alt="" />
          </div>
        </div>
      </div>
      <MapView taxonKey={params.id}/>
    </div>
    </>
  )
}

export default SpecieDetail
