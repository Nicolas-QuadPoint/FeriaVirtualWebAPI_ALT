import _usuarioRepository from './usuario.repository.js';

/**
 * Objeto que incluye las rutas para las distintas operaciones 
 * permitidas para la sección 'usuarios'. Todas las operaciones 
 * son protegidas, y requieren previa autorización. Ojo, algunas de estas 
 * funcionalidades solo deberían usarse por usuarios Administradores 
 * (Aspecto no previsto aún) 
 * 
 * - /usuarios: Obtiene una lista completa de usuarios registrados 
 * en la base de datos, en forma de array de objetos JSON. Usa el 
 * método http GET. 
 * 
 * - /usuarios/nuevo: Permite crear un nuevo usuario para insertarlo 
 * en la base de datos, enviando el objeto usuario a crear, en forma 
 * de JSON. Usa el método http POST.
 * 
 * - /usuarios/:usuarioid: Permite buscar un usuario cuyo ID sea entregado 
 * en :usuarioid. Dependiendo del tipo de petición http, las acciones 
 * a realizar variarán:
 * 
 *  - Función GET: Entrega un objeto usuario en JSON si llega a encontrarlo. 
 *  - Función PUT: Modifica el usuario, utilizando los datos a cambiar en 
 *  el cuerpo de la petición.
 *  - Función DELETE: Deshabilita (cambia el estado, no elimina) el usuario 
 *  con la ID especificada. Con esto, el usuario no podrá autenticarse. 
 * 
 * - /usuarios/:usuarioid/changepassword: Permite el cambio de contraseña 
 * del usuario con la ID indicada en :usuarioid. Los datos de nueva contraseña 
 * se especifican en el cuerpo de la petición, en forma de objeto JSON.
 * 
 * 
 * @param {Router} objetoRouter Objeto que entrega express para 
 * gestionar las rutas.
 * @see https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/
 */
export default function(objetoRouter){

    const usuarioRepository = _usuarioRepository();

    objetoRouter.route('/usuarios')
        .get(usuarioRepository.getUsuarios);

    objetoRouter.route('/usuarios/nuevo')
        .post(usuarioRepository.nuevoUsuario);


    /* Método que se interpone entre las peticiones a esta url, para evaluar  */
    objetoRouter.use('/usuarios/:usuarioid', usuarioRepository.interceptarUsuarioPorID);
    
    /* Si el método interceptor evalua positivamente, deriva a estas operaciones  */
    objetoRouter.route('/usuarios/:usuarioid')
        .get(usuarioRepository.getUsuario)
        .put(usuarioRepository.modificarUsuario)
        .delete(usuarioRepository.deshabilitarUsuario);

    objetoRouter.route('/usuarios/:usuarioid/changepassword')
        .post(usuarioRepository.cambiarContrasenaUsuario);

}