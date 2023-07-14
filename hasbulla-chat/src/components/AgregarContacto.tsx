import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface Props {
    cerrarModal: () => void,
    agregarContacto: () => void,
    show: boolean,
}

export default function AgregarContacto({show, cerrarModal, agregarContacto}: Props){

    


    return <>
        <div>
        <Dialog open={show} onClose={cerrarModal}>
            <DialogTitle className=''>Buscar contacto</DialogTitle>
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
                    type="emusernameail"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={cerrarModal}>Cancelar</Button>
            <Button onClick={agregarContacto}>Agregar usuario</Button>
            </DialogActions>
        </Dialog>
        </div>
    </>

}