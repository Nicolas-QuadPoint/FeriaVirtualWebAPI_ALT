import Entity from './Entity.js';

class Rol extends Entity{

    id_rol = 0;
    descripcion = 'rol';
    
    /*
    1	Administrador
    2	Productor
    3	Transportista
    4	Cliente
    5	Informes
    */

    //Definiciones validas:
    static roles = [

        new Rol(-1,'Desconocido'),
        new Rol(1,'Administrador'),
        new Rol(2,'Productor'),
        new Rol(3,'Transportista'),
        new Rol(4,'Cliente'),
        new Rol(5,'Informes')

    ];

    constructor(p_id=0,p_descripcion='rol'){
        super();
        this.id_rol = p_id;
        this.descripcion = p_descripcion;
    }

    clone(obj={},safe=false){
        
        if(safe){

            this.id_rol = util.isNullOrUndefined(obj.id_rol)? 0 : obj.id_rol;
            this.descripcion = util.isNullOrUndefined(obj.descripcion)? ' ' : obj.descripcion;

        } else {

            this.id_rol = obj.id_rol;
            this.descripcion = obj.descripcion;

        }

    }

    validate(){
        return true;
    }

}

export default Rol;