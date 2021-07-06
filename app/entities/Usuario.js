import Entity from './Entity.js';
import EstadoContrato from './EstadoContrato.js';
import EstadoUsuario from './EstadoUsuario.js';
import Rol from './Rol.js';

import util from '../utilities/utilities.js';
import ContratoUsuario from './ContratoUsuario.js';

class Usuario extends Entity{

    //ID_USUARIO, NOMBRE, APELLLIDO, EMAIL, TIPO, PASSWORD, ID_PRODUCTOR

    id_usuario = 0;
    nombre = 'Usuario';
    apellido = 'Apellido paterno';
    email  = 'email@domain.cc';
    rol = Rol.roles[0];
    contrasena  = 'Contraseña';
    id_productor = 0;

    constructor(){
        super();
    }

    buildFromArray(arr = []){

        var rol_temp = Rol.roles.find((r) => r.id_rol == arr[4]);

        this.id_usuario = arr[0];
        this.nombre = arr[1];
        this.apellido = arr[2];
        this.email  = arr[3];
        this.rol = (util.isNullOrUndefined( rol_temp ))? Rol.roles[0] : rol_temp;
        this.contrasena  = 'contrasena';
        this.id_productor = arr[6];

        console.log(rol_temp);

    }

    clone(obj = {},safe = false){

        if(safe){

            this.id_usuario = ( util.isNullOrUndefined(obj[0]) || isNaN(obj[0]))? 0 : obj[0];
            this.nombre = (util.isNullOrUndefined(obj[1]) || !util.isNameValid(this.nombre))? 'Usuario' : obj[1];
            this.apellido = ( util.isNullOrUndefined(obj[2]) || !util.isNameValid(this.apellido) )? 'Apellido paterno': obj[2];
            this.email  = ( util.isNullOrUndefined(obj[3]))? 'email@domain.cc' : obj[3];
            this.rol = ( util.isNullOrUndefined(obj[4]) || isNaN(obj[4]) )? 0 : obj[4];
            this.contrasena  = ( util.isNullOrUndefined(obj[5]) )? 'Contraseña' : obj[5];
            this.id_productor = ( util.isNullOrUndefined(obj[6]) || isNaN(obj[6]) )? 0 : obj[6];
            
            
        } else {

            this.id_usuario = arr[0];
            this.nombre = arr[1];
            this.apellido = arr[2];
            this.email  = arr[3];
            this.rol = arr[4];
            this.contrasena  = arr[5];
            this.id_productor = arr[6];

        }

    }

    validate(){

        //ID_USUARIO, NOMBRE, APELLLIDO, EMAIL, TIPO, PASSWORD, ID_PRODUCTOR

        return (

            ( !util.isNullOrUndefined(this.id_usuario) )&&
            ( !util.isNullOrUndefined(this.nombre) && util.isNameValid(this.nombre) ) &&
            ( !util.isNullOrUndefined(this.apellido) && util.isNameValid(this.apellido) ) &&
            ( !util.isNullOrUndefined(this.email)) &&
            ( !util.isNullOrUndefined(this.contrasena) ) &&
            ( !util.isNullOrUndefined(this.rol) ) &&
            ( !util.isNullOrUndefined(this.id_productor) )

        );
    }

}

export default Usuario;