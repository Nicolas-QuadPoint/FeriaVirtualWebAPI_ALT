import Entity from './Entity.js';

class EstadoUsuario extends Entity{

    id_estado_usuario = 0;
    descripcion = 'estado_usuario';

    constructor(){
        super();
    }

    clone(obj={},safe=false){
        
        if(safe){

            this.id_estado_usuario = util.isNullOrUndefined(obj.id_estado_usuario)? 0 : obj.id_estado_usuario;
            this.descripcion = util.isNullOrUndefined(obj.descripcion)? ' ' : obj.descripcion;

        } else {

            this.id_estado_usuario = obj.id_estado_usuario;
            this.descripcion = obj.descripcion;

        }

    }

    validate(){
        return true;
    }

}

export default EstadoUsuario;