import Entity from './Entity.js';
import Usuario from './Usuario.js';

class ObjetoVentaSimple extends Entity {

    id_venta = 0;
    fecha_inicio_venta = '01-01-2000';
    comentarios_venta = 'Comentarios.';
    usuario_autor = new Usuario();

    constructor() {
        super();
    }

    validate(){
        return true;
    }

    buildFromArray(arr = []){

        for(var i = 0; i < arr.length; i++){

            this.id_venta = arr[0];
            this.fecha_inicio_venta = arr[1];
            this.comentarios_venta = arr[2];
            this.usuario_autor = new Usuario();
            this.usuario_autor.id_usuario = arr[3]
            this.usuario_autor.nombre = arr[4];

        }
    }

}

export default ObjetoVentaSimple;