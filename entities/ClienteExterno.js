import Usuario from './Usuario.js';

class ClienteExterno extends Usuario{

    nombre_empresa = '';
    
    constructor(){
        super();
    }

    validate(){
        return true;
    }
}

export default ClienteExterno;