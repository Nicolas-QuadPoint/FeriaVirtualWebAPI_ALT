import Entity from './Entity.js';
import EstadoContrato from './EstadoContrato.js';

class ContratoUsuario extends Entity{

    id_contrato_usuario = 0;
    fecha_inicio_contrato = '';
    fecha_termino_contrato = '';
    estado_contrato = new EstadoContrato();
    
    constructor(){
        super();
    }

    validate(){
        return true;
    }
}

export default ContratoUsuario;