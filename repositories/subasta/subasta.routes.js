import _subastaRepository from './subasta.repository.js';

/**
 * Objeto que incluye las rutas para las distintas operaciones 
 * permitidas para la sección 'subastas'. Todas las operaciones 
 * son protegidas, y requieren previa autorización. Ojo, algunas de estas 
 * funcionalidades solo deberían usarse por usuarios Administradores 
 * (Aspecto no previsto aún) 
 * 
 * 
 * @param {Router} objetoRouter Objeto que entrega express para 
 * gestionar las rutas.
 * @see https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/
 */
export default function(objetoRouter){

    const subastaRepository = _subastaRepository();

    /* Método que se interpone entre las peticiones a esta url, para evaluar  */
    objetoRouter.use('/subastas/:idsubasta', subastaRepository.interceptarSubasta);
    
    /* Obtención de información */
    objetoRouter.route('/subastas/:idsubasta')
        .get(subastaRepository.getInfoSubasta);
    
    objetoRouter.route('/subastas/:idsubasta/productor')
        .get(subastaRepository.getPujasSubastaProductor);

    objetoRouter.route('/subastas/:idsubasta/transportista')
        .get(subastaRepository.getPujasSubastaTransportista);

    /* Obtención de información detallada */
    objetoRouter.route('/subastas/:idsubasta/productor/:idproductor/detalles')
        .get(subastaRepository.getDetallePujaSubastaProductor);

    objetoRouter.route('/subastas/:idsubasta/transportista/:idtransportista/detalles')
        .get(subastaRepository.getDetallePujaSubastaTransportista);


    /* Mantención */
    objetoRouter.route('/subastas/:idsubasta/productor/puja')
        .post(subastaRepository.pujarSubastaProductor)
        .delete(subastaRepository.removerPujaSubastaProductor);
    

    objetoRouter.route('/subastas/:idsubasta/transportista/puja')
        .post(subastaRepository.pujarSubastaTransportista)
        .delete(subastaRepository.removerPujaSubastaTransportista);
    
}