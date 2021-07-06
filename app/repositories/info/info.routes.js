import _infoRepository from './info.repository.js';

/**
 * Objeto que incluye las rutas para las distintas operaciones 
 * permitidas para la sección 'auth'.
 * 
 * - /api-objects/:objectid: Pide la información (estructura) 
 * de un objeto de la WebAPI, en forma de JSON, especificando 
 * en el campo :objectid el nombre canónico del objeto. Con 
 * este método se pueden consultar todos los objetos de la 
 * web api que están disponibles. Usa el método http GET.
 * 
 * - /estados-contrato: Obtiene los Estados de Contrato, en JSON,
 * usando el método http GET.
 * 
 * - /estados-usuario: Obtiene los Estados de Usuario, en JSON,
 * usando el método http GET.
 * 
 * - /estados-venta: Obtiene los estados de Venta, en JSON,
 * usando el método http GET.
 * 
 * - /estados-subasta: Obtiene los Estado de Subasta, en JSON,
 * usando el método http GET.
 * 
 * - /tipos-venta: Obtiene los Tipos de Venta, en JSON,
 * usando el método http GET.
 * 
 * - /tipos-subasta: Obtiene los Tipos de Subasta, en JSON,
 * usando el método http GET.
 * 
 * - /tipos-producto: Obtiene los Tipos de Producto, en JSON,
 * usando el método http GET.
 * 
 * - /roles-usuario: Obtiene los Roles de usuario, en JSON,
 * usando el método http GET.
 * 
 * - /nacionalidades: Obtiene la lista de Nacionalidades, en JSON,
 * usando el método http GET.
 * 
 * Para todos los casos anteriores, si ocurre un error, un objeto
 * Exception será generado acorde a la situación, y en última instancia,
 * un objeto con el error del servidor.
 * 
 * @param {Router} objetoRouter Objeto pasado por express para 
 * gestionar las rutas con las operaciones.
 */
export default function(objetoRouter){

    const infoRepository = _infoRepository();

    objetoRouter.route('/api-objects/:objectid')
        .get(infoRepository.getAPIObjects);
    
    objetoRouter.route('/estados-contrato')
        .get(infoRepository.getEstadosContrato);
    
    objetoRouter.route('/estados-usuario')
        .get(infoRepository.getEstadosUsuario);

    objetoRouter.route('/estados-venta')
        .get(infoRepository.getEstadosVenta);

    objetoRouter.route('/estados-subasta')
        .get(infoRepository.getEstadosSubasta);

    objetoRouter.route('/tipos-venta')
        .get(infoRepository.getTiposVenta);

    objetoRouter.route('/tipos-subasta')
        .get(infoRepository.getTiposSubasta);

    objetoRouter.route('/tipos-producto')
        .get(infoRepository.getTiposProducto);
    
    objetoRouter.route('/roles-usuario')
        .get(infoRepository.getRolesUsuario);

    objetoRouter.route('/nacionalidades')
        .get(infoRepository.getNacionalidades);
    
}