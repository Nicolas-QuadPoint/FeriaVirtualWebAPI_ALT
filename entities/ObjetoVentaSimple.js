import Entity from './Entity.js';
import Usuario from './Usuario.js';
import EstadoVenta from './EstadoVenta.js';

class ObjetoVentaSimple extends Entity {

    id_venta = 0;
    fecha_inicio_venta = '01-01-2000';
	fecha_fin_venta = '01-01-2000';
    comentarios_venta = 'Comentarios.';
	estado_venta = new EstadoVenta();

    constructor() {
        super();
    }

    validate(){
        return true;
    }

    buildFromArray(arr = []){

		this.id_venta = arr[0];
		this.comentarios_venta = arr[1];
		this.fecha_inicio_venta = arr[2];
		this.fecha_fin_venta = arr[3];
		this.estado_venta = new EstadoVenta();
		this.estado_venta.id_estado_venta = arr[4];
		this.estado_venta.descripcion = arr[5];
    }

}

export default ObjetoVentaSimple;