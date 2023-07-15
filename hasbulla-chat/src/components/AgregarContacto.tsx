import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ChangeEvent, useState } from 'react';
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

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
        <Dialog open={show} onClose={cerrarModal}>
            <DialogTitle className='bg-cyan-600 font-bold mb-2'>Buscar contacto</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Para agregar, debe poner el nombre de usuario de la persona.
                    En caso de que exista se agregará automáticamente.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="username"
                  label="Escribir nombre de usuario"
                  type=""
                  fullWidth
                  variant="standard"
                  value={username} 
                  onChange={handleChange} 
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={cerrarModal}>Cancelar</Button>
              <Button onClick={handleAgregarContacto}>Agregar usuario</Button>
            </DialogActions>
        </Dialog>
      </>
    );
  }
