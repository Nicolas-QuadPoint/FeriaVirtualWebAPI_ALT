import _productoRepository from './producto.repository.js';
import AuthAutenticationService from '../auth/auth.autentication.service.js';

/**
 * Objeto que incluye las rutas para las distintas operaciones 
 * permitidas para la sección 'productos'. Todas las operaciones 
 * son protegidas, y requieren previa autorización. 
 * 
 * - /productos: Obtiene una lista de todos los productos, 
 * en forma de un array de objetos JSON. Usa el método http GET. 
 * 
 * - /productos/nuevo: Petición que crea un nuevo registro de 
 * producto en la base de datos, utilizando datos entregados por 
 * el cliente. Vease el objeto de entidad Producto para más detalles 
 * del cómo enviar los datos a la api. Usa el método http POST. 
 * 
 * - /productos/:productoid: Encuentra un objeto Producto en la 
 * base de datos basado en el ID entregado en :productoid, y lo 
 * devuelve al cliente en forma de objeto JSON. 
 * Usa el método http GET. 
 * 
 * @see {Producto}
 * @param {Router} objetoRouter Objeto entregado por 
 * express para gestionar las rutas.
 */
export default function(objetoRouter){

    const productoRepository = _productoRepository();

    /* Gestiono la operacion de obtencion de ventas */
    objetoRouter.route('/productos')
        .get(productoRepository.getProductos);

    /* Objeto para crear un nuevo usuario */
    objetoRouter.route('/productos/nuevo')
        .post(productoRepository.nuevoProducto);

    /* Método que se interpone entre las peticiones a esta url, para evaluar  */
    objetoRouter.use('/productos/:productoid', productoRepository.interceptarProductoPorID);
    
    /* Si el método interceptor evalua positivamente, deriva a estas operaciones  */
    objetoRouter.route('/productos/:productoid')
        .get(productoRepository.getProducto)
        .put(productoRepository.modificarProducto);

}