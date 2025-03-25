import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MyMap = () => {
  const position = [51.505, -0.09]; // Default center position (latitude, longitude)

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      {/* Use OpenStreetMap tiles */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A sample marker! <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;
