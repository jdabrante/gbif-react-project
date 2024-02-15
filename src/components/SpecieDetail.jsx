import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MapView from './Map'
import "./SpecieDetail.css"
import loading from './svg/loading.svg'

// Componente del detella de la especie donde se renderizará información
// de la misma así como un mapa de distribución de la especie
export const SpecieDetail = () => {
  // Hook para el seteo de la especie ( se inicia como {} porque será un objeto vacio al principio )
  const [specie, setSpecie] = useState({})
  // Hook para el seteo de la imagen de la especie ( se inicia como {} porque será un objeto vacio al principio )
  const [image, setImage] = useState({})
  // Hook para el seteo del gif de loading ( se inicia en false para luego cambiar a true cuando se termine de realizar la llamada asíncrona a la API)
  const [loadingGif, setLoadingGif] = useState(false)

  // Nesario para obtener los parámetros de la URL
  const params = useParams()
  // Endpoint de la API GBIF para obtener los datos de una especie en concreto ( se usa el taxonKey que se utiliza como id en la URL )
  const DataURL = 'https://api.gbif.org/v1/species/match?usageKey='
  // Endpoint de la API GBIF para obtener imágenes de la especie ( en nuestro caso solo tomaremos la primera que se encuentre en la respuesta )
  // En algunos caso no existe imágen y esto no está controlado aún así que se quedará el gif de carga de forma indefinida
  // Esta variable nunca se llega a usar, pero se encuentra aquí para poder explicar mejor su utilidad. Más adelante se utilizará y se cambiará el parámetros 
  // taxonKey=5 por taxonKey${params.id}
  const ImageURL = 'https://api.gbif.org/v1/occurrence/search?taxonKey=5&mediaType=StillImage&limit=300'


  // En los dos hooks de useEffect siguiente, la lista vacia sirve para que solo se ejecute una vez despues de montar el componente, no al actualizarlo
  // Hook para la obtención de los datos de la especie por medio de fetch
  useEffect(() => {
    fetch(`${DataURL}${params.id}`)
    .then(result => result.json())
    .then(data => {
      setSpecie(data)
    })
  }, [])

  // Hook para la obtención de la imagen por medio de fetch
  useEffect(() => {
    setLoadingGif(true)
    fetch(`https://api.gbif.org/v1/occurrence/search?taxonKey=${params.id}&mediaType=StillImage&limit=300`)
    .then(result => result.json())
    .then(data => {
      setImage(data.results[0].media[0].identifier)
      setLoadingGif(false)
    })
  }, [])


  // Se devuelven los datos renderizados además del mapa ( el cual es otro componente al cual hay que suministrarle también el taxonKey de la especie )
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
