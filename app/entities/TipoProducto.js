import Entity from './Entity.js';

class TipoProducto extends Entity{

    id_tipo_producto = 0;
    descripcion = 'tipo_producto';

    constructor(){
        super();
    }

    clone(obj={},safe=false){
        
        if(safe){

            this.id_tipo_producto = util.isNullOrUndefined(obj.id_tipo_producto)? 0 : obj.id_tipo_producto;
            this.descripcion = util.isNullOrUndefined(obj.descripcion)? ' ' : obj.descripcion;

        } else {

            this.id_tipo_producto = obj.id_tipo_producto;
            this.descripcion = obj.descripcion;

        }

    }

}

export default TipoProducto;