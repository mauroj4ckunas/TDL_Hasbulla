import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ChangeEvent, useState } from 'react';

interface Props {
    cerrarModal: () => void,
    agregarContacto: (usuario: string) => void,
    show: boolean,
}
export default function AgregarContacto({ show, cerrarModal, agregarContacto }: Props) {
    const [username, setUsername] = useState('');
  
    const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    };
  
    const handleAgregarContacto = () => {
      agregarContacto(username);
      setUsername(''); 
    };
  
    return (
      <>
        <div>
          <Dialog open={show} onClose={cerrarModal}>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Escribir nombre de usuario"
              type="email"
              fullWidth
              variant="standard"
              value={username} 
              onChange={handleChange} 
            />
            <Button onClick={handleAgregarContacto}>Agregar usuario</Button>
          </Dialog>
        </div>
      </>
    );
  }
