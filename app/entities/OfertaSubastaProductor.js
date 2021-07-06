import Entity from './Entity.js';
import Subasta from './Subasta.js';
import Producto from './Producto.js';
import Productor from './Productor.js';
import TipoVenta from './TipoVenta.js';

class OfertaSubastaProductor extends Entity{

    id_detalle = 0;
    id_venta = 0;
    cantidad = 0;
    tipo_venta = new TipoVenta();
    producto = new Producto();

    constructor(){
        super();
    }
	
	buildFromArray(arr=[]){
		
        this.id_detalle = arr[0];
        this.id_venta = arr[1];
        this.cantidad = arr[2];
        this.tipo_venta = new TipoVenta();
        this.tipo_venta.id_tipo_venta = arr[3];
        this.producto = new Producto();
        this.producto.id_producto = arr[4];
        this.producto.nombre = arr[5];
        this.producto.cantidad = arr[6];
        this.producto.peso = arr[7];
        this.producto.volumen = arr[8];
        this.producto.estado = arr[9];
        this.producto.refrigeracion = arr[10];
        this.producto.fecha_llegada = arr[11];
        this.producto.codigo_productor = arr[12];
		
	}

    clone(obj={}){

        this.id_detalle = obj.id_detalle;
        this.id_venta = obj.id_venta;
        this.cantidad = obj.cantidad;
        this.tipo_venta = new TipoVenta();
        this.tipo_venta.id_tipo_venta = obj.tipo_venta.id_tipo_venta;
        this.producto = new Producto();
        this.producto.id_producto = obj.producto.id_producto;

    }

    validate(){

        return true;

    }

}

export default OfertaSubastaProductor;