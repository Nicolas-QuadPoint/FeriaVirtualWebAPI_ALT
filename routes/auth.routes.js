import express from 'express';
import AuthRoutes from '../repositories/auth/auth.routes.js';
import UsuariosRoutes from '../repositories/usuario/usuario.routes.js';
import VentasRoutes from '../repositories/venta/venta.routes.js';
import ProductosRoutes from '../repositories/producto/producto.routes.js';
import InfoRoutes from '../repositories/info/info.routes.js';
import AuthAutenticationService from '../repositories/auth/auth.autentication.service.js';

/**
 * @returns Un objeto Router con la ruta de autenticación. Esta permite 
 * interceptar cada llamada a funciones de api que son protegidas, para mejorar 
 * la seguridad.
 */
export default function() {

    const router = express.Router();

    //Representa las rutas derivantes de autenticacion
    var auth = AuthRoutes(router);

    return router;
}