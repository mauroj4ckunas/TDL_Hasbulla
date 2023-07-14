import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';

interface Props {
    cerrarModal: () => void;
    enviar: (base64String: string) => void;
    show: boolean;
}


export default function EnviarImagen({show, cerrarModal, enviar}: Props) {

    const [base64, setBase64] = useState<string>('')

    const convertImageToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result); 
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(file);
        });
    };
      
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        
        if (file) {
            convertImageToBase64(file)
            .then((base64String) => {
                if (typeof base64String === 'string') {
                    setBase64(base64String);
                }
            })
            .catch((error) => {
                console.error(error);
            });
        }
    };

    return <>
        <Dialog open={show} onClose={cerrarModal}>
            <DialogTitle className='bg-blue-50 text-violet-800 shadow-md text-center'>Enviar Imágen</DialogTitle>
            <DialogContent>
                <DialogContentText className="">
                <label className="block">
                    <input type="file" className="block my-4 w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100"
                        accept="image/png, image/jpeg"
                        onChange={handleImageUpload}
                    />
                </label>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={cerrarModal}>Cancelar</Button>
                <Button onClick={() => enviar(base64)}>Aceptar</Button>
            </DialogActions>
        </Dialog>
    </>
}