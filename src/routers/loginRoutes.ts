import {Router} from 'express';
import * as services from '../controllers/servicesControllers';
import * as login from '../controllers/usersControllers'

class LoginRoutes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
    
    routes(): void {
        this.router.post('/signUp', services.createUserController);
        this.router.post('/signIn', login.signIn)
    }
}

const loginRouts = new LoginRoutes();
loginRouts.routes();

export default loginRouts.router;