import React from 'react'
import {MapContainer, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.css'
import './Map.css'

// Componente para la renderización del mapa
// Para la creación de este componente se ha utilizado react-leaflet, una libreria para el renderizado de mapas.
// Además como mapa opensource se ha utilizado OpenStreetMap y para la capa de distribución las propias que ofrece GBIF en su API
// https://techdocs.gbif.org/en/openapi/v2/maps
// https://react-leaflet.js.org
// El componente toma como prop el taxonKey que se va a utilizar para la llamada a la API
const MapView = ({taxonKey}) => {
    console.log(taxonKey)
    // End point de la API para la obtención de la capa. Permite añadir más parámetros, pero se ha decidio utilizar un estilo de polígonos con el tamaño 50 de polígonos
    const SpecieOverlay = `https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?bin=hex&hexPerTile=50&style=classic.poly&srs=EPSG%3A3857&taxonKey=${taxonKey}`
    // react-leaflet cuenta con el componete MapContainer el cual será el que creará el contendor para el mapa en cuestión
    // para añadir las capas de los mapas cuenta con el componente TileLayer ( hay que tener en cuenta que la disposición de los componentes define como se mostrarán las capas en el mapa)
    // El atributo attribution contiene la referencia al mapa utilizado ( ya que ambos son opensource )
    // El atributo url recoge la url de donde obtendremos la capa en cuestión ( para la capa de densidad se utiliza la url que se ha creado anteriormente con el taxonKey de la especie )
    return(
     <MapContainer center={[0, 0]} zoom={3}>
         <TileLayer attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
        <TileLayer attribution='&copy; <a href="https://www.gbif.org">GBIF</a> contributors'
        url={SpecieOverlay}/>
    </MapContainer>
    )
}

export default MapView