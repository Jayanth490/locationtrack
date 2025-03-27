import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import '../App.css';
const MapUpdater = ({ lat, lng }) => {
  const map = useMap();

  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 13); // Adjust zoom level if needed
    }
  }, [lat, lng, map]);

  return null;
};

const MyMap = ({ lat, lng }) => {
  return (
    <MapContainer
      center={[lat || 51.505, lng || -0.09]}
      zoom={13}
      className="map-container"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Update center when lat/lng changes */}
      <MapUpdater lat={lat} lng={lng} />

      {lat && lng && (
        <Marker position={[lat, lng]}>
          <Popup>
            📍 Latitude: {lat} <br /> 📍 Longitude: {lng}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MyMap;
