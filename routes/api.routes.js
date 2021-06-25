import express from 'express';
import AuthRoutes from '../repositories/auth/auth.routes.js';
import UsuariosRoutes from '../repositories/usuario/usuario.routes.js';
import VentasRoutes from '../repositories/venta/venta.routes.js';
import ProductosRoutes from '../repositories/producto/producto.routes.js';
import InfoRoutes from '../repositories/info/info.routes.js';
import SubastasRoutes from '../repositories/subasta/subasta.routes.js';
import AuthAutenticationService from '../repositories/auth/auth.autentication.service.js';

/**
 * 
 * Objeto maestro que posee las rutas de la webapi.
 * 
 * @returns Objeto Router con las rutas de la webapi.
 */
export default function() {
    const router = express.Router();

    //Representa todas las rutas anteriores!
    var auth = AuthRoutes(router);

    var usuarios = UsuariosRoutes(router);
    var ventas = VentasRoutes(router);
    var productos = ProductosRoutes(router);
    var info = InfoRoutes(router);
    var subastas = SubastasRoutes(router);

    return router;
}