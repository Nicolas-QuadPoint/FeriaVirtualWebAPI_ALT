import express from 'express';
import Path from 'path';
import URL from 'url';
//import DotEnv from 'dotenv';
import AuthRoutes from './routes/auth.routes.js';
import InfoRoutes from './routes/api.public.routes.js';
import WebRoutes from './routes/web.routes.js';
import APIRoutes from './routes/api.routes.js';
import AuthAutenticationService from './repositories/auth/auth.autentication.service.js';

const app = express();
const apiRoutes = APIRoutes();
const webRoutes = WebRoutes();
const infoRoutes = InfoRoutes();
const authRoutes = AuthRoutes();

/* https://stackoverflow.com/a/62892482 */
const __dirname = URL.fileURLToPath(import.meta.url);

//Configuring enviromental values
//DotEnv.config();


//Public resources - Todo debajo de la carpeta indicada,
//sera de acceso publico para el usuario
app.use(express.static(Path.join(__dirname, '../public')));
app.set('views', Path.join(__dirname, '../views'));

//Usamos las cookies
//app.use(cookieParser());

//Allow responses to be parsed to JSON.
app.use(express.json());

//Web Routes
app.use('/',webRoutes);

//Public API Routes
app.use('/api/v1/info',infoRoutes);

//Authentication Routes
app.use('/api/v1/auth',authRoutes);

//Maneja el control de acceso para la api privada!
//Excluye a las rutas anteriores info y auth!
//(NO cambiar de orden!!)
//https://stackoverflow.com/a/2078953
app.all(/^\/api\/v1\/(?!info|auth).{1,}$/, AuthAutenticationService.checkAutenticatedToken);

//Private API Routes
app.use('/api/v1',apiRoutes);

//Init the server
app.listen(3000,() => console.log('FeriaVirtual WebAPI - Servidor iniciado en puerto %d!',3000));
