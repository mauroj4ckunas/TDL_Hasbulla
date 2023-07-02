import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React from 'react';

interface Props {
    cerrarModal: () => void;
    show: boolean;
}

export default function EnviarUbicacion({show, cerrarModal}: Props) {
    return <>
        <Dialog open={show} onClose={cerrarModal}>
            <DialogTitle className=''>Enviar Ubicacion</DialogTitle>
            
        </Dialog>
    </>
}