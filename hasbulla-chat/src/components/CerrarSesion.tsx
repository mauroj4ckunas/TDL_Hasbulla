import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface Props {
    cerrarModal: () => void,
    cerrarSesion: () => void,
    show: boolean,
}

export default function CerrarSesion({show, cerrarModal, cerrarSesion}: Props){

    return <>
        <div>
        <Dialog open={show} onClose={cerrarModal}>
            <DialogTitle className='bg-red-600 font-bold'>¿Seguro que quiere cerrar sesión?</DialogTitle>
            <DialogActions>
            <Button onClick={cerrarModal}>Cancelar</Button>
            <Button onClick={cerrarSesion}>Cerrar sesión</Button>
            </DialogActions>
        </Dialog>
        </div>
    </>

}