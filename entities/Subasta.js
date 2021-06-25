import Entity from './Entity.js';
import EstadoVenta from './EstadoVenta.js';
import TipoSubasta from './TipoSubasta.js';
import Venta from './Venta.js';

class Subasta extends Entity{

    id_subasta = 0;
    fecha_inicio_subasta = '01-01-2000';
    fecha_fin_subasta = '01-01-2000';
    tipo_subasta = new TipoSubasta();
    estado_subasta = new EstadoVenta();
    venta = new Venta();

    //Tendrá registros solo si la subasta es para productores
    ofertas_productores = [

        //new OfertaSubastaProductor()

    ];

    //Tendrá registros solo si la subasta es para transportistas
    ofertas_transportistas = [

       // new OfertaSubastaTransportista()

    ];

    constructor(){
        super();
    }

    buildFromArray(arr = []){

        this.id_subasta = arr[0];
        this.fecha_inicio_subasta = arr[1];
        this.fecha_fin_subasta = arr[2];
        this.tipo_subasta = new TipoSubasta();
        this.tipo_subasta.id_tipo_subasta = arr[3];
        this.tipo_subasta.descripcion = arr[4];
        this.estado_subasta = new EstadoVenta();
        this.estado_subasta.id_estado_venta = arr[5];
        this.estado_subasta.descripcion = arr[6];
        this.venta = new Venta();
        this.venta.id_venta = arr[7];

    }

}

export default Subasta;