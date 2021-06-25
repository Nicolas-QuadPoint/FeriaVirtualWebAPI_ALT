import _authRepository from './auth.repository.js';

/**
 * Objeto que incluye las rutas para las distintas operaciones 
 * permitidas para la sección 'auth'.
 * 
 * - /login: Realiza la operación de iniciar sesión en la WebAPI, 
 * usando el método http POST.
 * 
 * - /logout: Realiza el cierre de sesión en la WebAPI, 
 * usando el método http POST.
 * 
 * @param {Router} objetoRouter Objeto pasado por express para 
 * gestionar las rutas con las operaciones.
 */
export default function(objetoRouter){

    const authRepository = _authRepository();

    objetoRouter.route('/login')
        .post(authRepository.login);
    
    objetoRouter.route('/logout')
        .post(authRepository.logout);

}