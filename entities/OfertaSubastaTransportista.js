import Entity from './Entity.js';
import Subasta from './Subasta.js';
import Transportista from './Transportista.js';

class OfertaSubastaTransportista extends Entity{

    id_subasta_productor = 0;
    descripcion_propuesta = 'descripcion_propuesta';
    fecha = '01-01-2000';
    transportista = new Transportista();
    seleccionado = false;
    subasta = new Subasta();

    constructor(){
        super();
    }

}

export default OfertaSubastaTransportista;