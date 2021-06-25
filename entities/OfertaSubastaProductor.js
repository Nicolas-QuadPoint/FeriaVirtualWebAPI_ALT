import Entity from './Entity.js';
import Subasta from './Subasta.js';
import Producto from './Producto.js';
import Productor from './Productor.js';

class OfertaSubastaProductor extends Entity{

    id_subasta_productor = 0;
    unidades_producto = 0;
    precio_unidad = 0;
    producto = new Producto();
    productor = new Productor();
    seleccionado = false;
    subasta = new Subasta();

    constructor(){
        super();
    }

}

export default OfertaSubastaProductor;