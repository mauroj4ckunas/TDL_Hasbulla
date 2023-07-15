import { faPlus, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SpeedDial, SpeedDialAction } from "@mui/material";

interface Props {
    modalAgregarUsuario: () => void,
    modalCierreSesion: () => void,
}

export default function TituloChats({modalAgregarUsuario, modalCierreSesion}: Props){

    

    return (
        <>  
        <div className="flex justify-between mb-2">
            <div className="text-white text-2xl p-4 mt-2">
                <h2 className="italic">Chats</h2>
            </div>
            <div className="hidden md:block" style={{ position: 'absolute', left: '15%', top: '0.01%', marginRight: '5px' }}>
                <SpeedDial
                    ariaLabel="Opciones de mensajes"
                    sx={{ position: 'relative', mt: 2, mr: 2, zIndex: 20 }}
                    icon={<FontAwesomeIcon icon={faPlus} size="2xl" />}
                    direction="down"
                >   
                    <SpeedDialAction
                        key={'Usuarios'}
                        sx={{zIndex: 50}}
                        icon={<FontAwesomeIcon icon={faUser} size="lg" />}
                        tooltipTitle={'Agregar Contacto'}
                        onClick={modalAgregarUsuario}
                    />
                    <SpeedDialAction
                        key={'Sesion'}
                        sx={{zIndex: 50}}
                        icon={<FontAwesomeIcon icon={faRightFromBracket} size="lg" />}
                        tooltipTitle={'Cerrar Sesión'}
                        onClick={modalCierreSesion}
                    />
                </SpeedDial>
            </div>
        </div>
        <hr className="border-black"/>
        </>
    );
}