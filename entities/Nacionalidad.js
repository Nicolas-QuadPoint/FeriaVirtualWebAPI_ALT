import Entity from './Entity.js';
import util from '../utilities/utilities.js';

class Nacionalidad extends Entity{

    id_nacionalidad = 0;
    iso = 'xx';
    nombre = 'None';
    codigo_telefonico = '0';

    constructor(){
        super();
    }

    buildFromArray(arr = []){

        this.id_nacionalidad = arr[0];
        this.iso = arr[2];
        this.nombre = arr[1];
        this.codigo_telefonico = arr[3];
        
    }

    clone(obj={},safe=false){

        if(safe){

            this.id_nacionalidad = util.isNullOrUndefined(obj.id_nacionalidad)? 0 : obj.id_nacionalidad;
            this.nombre = util.isNullOrUndefined(obj.nombre)? ' ' : obj.nombre;
            this.iso = util.isNullOrUndefined(obj.iso)? ' ' : obj.iso;
            this.codigo_telefonico = util.isNullOrUndefined(obj.codigo_telefonico)? ' ' : obj.codigo_telefonico;

        } else {

            this.id_nacionalidad = obj.id_nacionalidad;
            this.nombre = obj.nombre;
            this.iso = obj.iso;
            this.codigo_telefonico = obj.codigo_telefonico;

        }
    }

    validate(){
        return true;
    }

}

export default Nacionalidad;