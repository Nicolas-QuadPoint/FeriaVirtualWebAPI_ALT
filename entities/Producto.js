import Entity from './Entity.js';
import TipoProducto from './TipoProducto.js';
import util from '../utilities/utilities.js';

class Producto extends Entity{

    //ID_PRODUCTO, NOMBRE, CANTIDAD, PESO, VOLUMEN, ESTADO, REFRIGERACION, FECHA_LLEGADA, CODIGO_PRODUCTOR

    id_producto = 0;
    nombre = 'ninguno';
    cantidad = 0;
    peso = 0;
    volumen = 0.0;
    estado = false;
    refrigeracion = false;
    fecha_llegada = '01/01/2000';
    codigo_productor = 0;
    

    constructor(
        p_id_producto = 0,
        p_nombre = 'ninguno',
        p_cantidad = 0,
        p_peso = 0,
        p_volumen = 0.0,
        p_estado = false,
        p_refrigeracion = false,
        p_fecha_llegada = '01/01/2000',
        p_codigo_productor = 0){

        super();

        this.id_producto = p_id_producto;
        this.nombre = p_nombre;
        this.cantidad = p_cantidad;
        this.peso = p_peso;
        this.volumen = p_volumen;
        this.estado = p_estado;
        this.refrigeracion = p_refrigeracion;
        this.fecha_llegada = p_fecha_llegada;
        this.codigo_productor = p_codigo_productor;

    }

    clone(obj={},safe=false){
        
        if(safe){

        } else {

        }

    }

    buildFromArray(arr = []){

        this.id_producto = arr[0];
        this.nombre = arr[1];
        this.cantidad = arr[2];
        this.peso = arr[3];
        this.volumen = arr[4];
        this.estado = arr[5];
        this.refrigeracion = arr[6];
        this.fecha_llegada = arr[7];
        this.codigo_productor = arr[8];
    }

}

export default Producto;