import React from 'react';
import { LatLngExpression, icon } from 'leaflet';
import locationIcon from '../assets/focus.png';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

interface Props {
    coordenadas: LatLngExpression;
}

const iconLocation = icon({
    iconUrl: locationIcon,
    iconSize: [35, 35],
    className: 'leaflet-icon'
  });

export default function MapaUbicacionActual({coordenadas}: Props) {

    return <>
        <MapContainer center={coordenadas} zoom={17} maxZoom={18} minZoom={13} zoomControl={true} dragging={true} className="leaflet-container">
            <TileLayer
                attribution='<a href="https://www.ign.gob.ar/">IGN</a>'
                url="https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png"
            />
            <Marker position={coordenadas} icon={iconLocation}>
                <Popup>Tu ubicación actual</Popup>
            </Marker>
        </MapContainer>
    </>
}