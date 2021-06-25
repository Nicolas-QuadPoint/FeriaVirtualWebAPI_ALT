import _ventasRepository from './venta.repository.js';

/**
 * 
 * Objeto que incluye las rutas para las distintas operaciones 
 * permitidas para la sección 'ventas'. Todas las operaciones 
 * son protegidas, y requieren previa autorización. Ojo, algunas de 
 * estas funcionalidades deberían usarse por usuarios Administradores 
 * (Aspecto no previsto aún) 
 * 
 * - /ventas: Obtiene una lista de objetos Venta, en JSON. Usa el 
 * método http GET. 
 * 
 * - /ventas/nuevo: Crea un nuevo proceso de venta, con el cual 
 * generar subastas o comprar saldos. Usa el método http POST. 
 * 
 * - /ventas/:ventaid: Ruta que intercepta una venta cuyo ID coincida 
 * con el que es entregado :ventaid. Dependiendo del método http, 
 * se pueden hacer las siguientes operaciones: 
 *  
 *  - Función GET: Obtiene ese registro de venta en particular, 
 *  en formato JSON. 
 *  - Función PUT: Modifica el proceso de venta, con datos adjuntados 
 *  en el cuerpo de la petición. 
 * 
 * - /ventas/usuario/:usuarioid: Obtiene una lista de objetos Venta 
 * que correspondan con el ID del usuario indicado en :usuarioid. 
 * Usa el método http GET.
 * 
 * @param {Router} objetoRouter Objeto entregado por express para 
 * gestionar las rutas.
 */
export default function(objetoRouter){

    const ventasRepository = _ventasRepository();

    /* Gestiono la operacion de obtencion de ventas */
    objetoRouter.route('/ventas')
        .get(ventasRepository.getVentas);

    objetoRouter.route('/ventas/nuevo')
        .post(ventasRepository.nuevaVenta);
    
    objetoRouter.route('/ventas/:ventaid')
        .get(ventasRepository.getVenta)
        .put(ventasRepository.updateVenta);

    objetoRouter.route('/ventas/usuario/:usuarioid')
        .get(ventasRepository.getVentasPorUsuario);

}