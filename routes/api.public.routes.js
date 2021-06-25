import express from 'express';
import AuthRoutes from '../repositories/auth/auth.routes.js';
import UsuariosRoutes from '../repositories/usuario/usuario.routes.js';
import VentasRoutes from '../repositories/venta/venta.routes.js';
import ProductosRoutes from '../repositories/producto/producto.routes.js';
import InfoRoutes from '../repositories/info/info.routes.js';
import AuthAutenticationService from '../repositories/auth/auth.autentication.service.js';

/**
 * @returns Un objeto Router con las rutas públicas de la webapi.
 */
export default function() {
    
    const router = express.Router();

    //Representa el archivo publico de apis!
    var info = InfoRoutes(router);

    return router;
}