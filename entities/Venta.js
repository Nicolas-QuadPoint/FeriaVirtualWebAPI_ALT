import Entity from './Entity.js';
import Usuario from './Usuario.js';
import EstadoVenta from './EstadoVenta.js';
import TipoVenta from './TipoVenta.js';
import ModoPago from './ModoPago.js';
import ParProductoCantidad from './ParProductoCantidad.js';

class Venta extends Entity{

    id_venta = 0;
    fecha_inicio_venta = '01-01-2000';
    fecha_fin_venta = '01-01-2000';
    comentarios_venta = 'Comentarios.';
    monto_total = 0;
    comision = 0.0;
    estado_venta = new EstadoVenta();
    usuario_autor = new Usuario();
    tipo_venta = new TipoVenta();
    modo_pago = new ModoPago();
    productos_venta = [];

    constructor(){
        super();
    }

    buildFromArray(arr = []){

        this.id_venta = arr[0];
        this.fecha_inicio_venta = arr[1];
        this.fecha_fin_venta = arr[2];
        this.comentarios_venta = arr[3];
        this.monto_total = arr[4];
        this.comision = arr[5];
        this.estado_venta = new EstadoVenta();
        this.estado_venta.id_estado_venta = arr[6];
        this.estado_venta.descripcion = arr[7];
        this.usuario_autor = new Usuario();
        this.usuario_autor.id_usuario = arr[8];
        this.usuario_autor.nombre = arr[9];
        this.tipo_venta = new TipoVenta();
        this.tipo_venta.id_tipo_venta = arr[10];
        this.tipo_venta.descripcion = arr[11];
        this.modo_pago = new ModoPago();
        this.modo_pago.id_modo_pago = arr[12];
        this.modo_pago.descripcion = arr[13];
        
    }

    setProductosVenta(arrParProductoCantidad){

        if(arrParProductoCantidad){

            /**
             * Vaciamos el array actual!
             * https://appdividend.com/2020/07/22/javascript-clear-array-how-to-empty-array-in-javascript/
             */
            this.productos_venta.length = 0;

            arrParProductoCantidad.array.forEach(element => {
                
                this.productos_venta.push(element);
                
            });

        }
    }

    validate(){
        return true;
    }

}

export default Venta;