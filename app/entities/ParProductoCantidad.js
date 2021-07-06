import Entity from './Entity.js';
import Producto from './Producto.js';
import TipoProducto from './TipoProducto.js';

class ParProductoCantidad extends Entity{

    producto = new Producto();
    cantidad = 0;
    
    constructor(){
        super();
    }

    clone(obj={},safe=false){
        
        if(safe){

            this.producto.clone(obj.producto,true);
            this.cantidad = util.isNullOrUndefined(obj.cantidad)? 0 : obj.cantidad;

        } else {

            this.producto.clone(obj.producto,false);
            this.cantidad = obj.cantidad;

        }

    }

    buildFromArray(arr = []){

        this.producto = new Producto();

        this.producto.id_producto = arr[0];
        this.producto.nombre = arr[1];
        this.producto.volumen = arr[2];
        this.producto.costo_mantencion = arr[3];
        this.producto.valor_mercado = arr[4];
        this.producto.tipo_producto = new TipoProducto();
        this.producto.tipo_producto.id_tipo_producto = arr[5];
        this.producto.tipo_producto.descripcion = arr[6];
        this.cantidad = arr[7];

    }

    validate(){
        return true;
    }

}

export default ParProductoCantidad;