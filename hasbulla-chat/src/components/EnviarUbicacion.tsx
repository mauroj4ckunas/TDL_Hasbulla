import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression} from 'leaflet';

import 'leaflet/dist/leaflet.css'
import MapaUbicacionActual from './MapaUbicacionActual';

interface Props {
  cerrarModal: () => void;
  enviar: (coordenadas: number[]) => void;
  show: boolean;
}


export default function EnviarUbicacion({show, cerrarModal, enviar}: Props) {
    const [LatLng, setLatLng] = useState<LatLngExpression | null>(null);
    const [latitud, setLatitud] = useState<number>(0);
    const [longitud, setLongitud] = useState<number>(0);

    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatLng([position.coords.latitude, position.coords.longitude]);
            setLatitud(position.coords.latitude);
            setLongitud(position.coords.longitude);
          },
          (error) => {
            console.error('Error al obtener la ubicación:', error);
          }
        );
      } else {
        alert('Geolocalización no es compatible con este navegador');
      }
    }, []); 

    return (
    <>
        <Dialog open={show} onClose={cerrarModal}>
          <DialogTitle className='bg-blue-50 text-violet-800 shadow-md text-center'>Enviar Ubicación</DialogTitle>
          <DialogContent>
          {LatLng ? (
            <div className='w-96 h-96 m-3'>
              <MapaUbicacionActual coordenadas={LatLng} />
            </div>
            ) : (
              <h2 className='text-rose-950'>La ubicación no está habilitada</h2>
            )}
          </DialogContent>
          <DialogActions>
                <Button onClick={cerrarModal}>Cancelar</Button>
                <Button onClick={() => enviar([latitud, longitud])}>Aceptar</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}