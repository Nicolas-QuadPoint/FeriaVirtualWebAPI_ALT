import Entity from './Entity.js';

import util from '../utilities/utilities.js';

class ObjetoCambiarContrasena extends Entity{

    id_usuario = 0;
    contrasena_actual = 'none';
    nueva_contrasena = 'none';

    constructor(){
        super();
    }

    buildFromArray(arr = []){

        this.id_usuario = arr[0];
        this.contrasena_actual = arr[1];
        this.nueva_contrasena = arr[2];
    }

    clone(obj={},safe=false){
        
        if(safe){

            this.id_usuario = util.isNullOrUndefined(obj.id_usuario)? 0 : obj.id_usuario;
            this.contrasena_actual = util.isNullOrUndefined(obj.contrasena_actual)? 'none' : obj.contrasena_actual;
            this.nueva_contrasena = util.isNullOrUndefined(obj.nueva_contrasena)? 'none' : obj.nueva_contrasena;

        } else {

            this.id_usuario = obj.id_usuario;
            this.contrasena_actual = obj.contrasena_actual;
            this.nueva_contrasena = obj.nueva_contrasena;

        }

    }

    validate(){

        return (

            ( !util.isNullOrUndefined(this.id_usuario) )&&
            ( !util.isNullOrUndefined(this.contrasena_actual) ) &&
            ( !util.isNullOrUndefined(this.nueva_contrasena) )
        );

    }

}

export default ObjetoCambiarContrasena;