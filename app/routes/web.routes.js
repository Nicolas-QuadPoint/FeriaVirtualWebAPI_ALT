import { Router } from 'express'; 
import IndexController from '../controllers/index.controler.js';

/**
 * @returns Un objeto Router con las rutas web (no webapi)
 */
export default function(){
    const router = Router();
    var indexcontroller = IndexController(router);
    return router;
};