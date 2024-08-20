import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 27.9478,
  lng: -82.4584
};

function MapComponent({ coords }) {
  return (
    <LoadScript
      googleMapsApiKey="EMPTY"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {coords && <Marker position={{ lat: parseFloat(coords.lat), lng: parseFloat(coords.lng) }} />}
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MapComponent);
