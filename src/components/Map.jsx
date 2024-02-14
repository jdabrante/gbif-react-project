import React from 'react'
import {MapContainer, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.css'
import './Map.css'

const MapView = ({taxonKey}) => {
    console.log(taxonKey)
    const SpecieOverlay = `https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?bin=hex&hexPerTile=50&style=classic.poly&srs=EPSG%3A3857&taxonKey=${taxonKey}`
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