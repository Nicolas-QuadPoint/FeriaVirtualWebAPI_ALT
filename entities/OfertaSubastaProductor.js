import Entity from './Entity.js';
import Subasta from './Subasta.js';
import Producto from './Producto.js';
import Productor from './Productor.js';
import TipoVenta from './TipoVenta.js';

class OfertaSubastaProductor extends Entity{

    id_venta = 0;
    producto = new Producto();
    cantidad = 0;
    tipoVenta = new TipoVenta();

    constructor(){
        super();
    }
	
	buildFromArray(arr=[]){
		
        
		
		
	}

}

export default OfertaSubastaProductor;