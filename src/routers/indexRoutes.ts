import {Router} from 'express';
import {getUserController, deleteUserController} from '../controllers/servicesControllers';

class IndexRoutes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
    
    routes(): void {
        this.router.get('/user/:id', getUserController);
        this.router.delete('/user/:id', deleteUserController);
    }
}

const crudRoutes = new IndexRoutes();
crudRoutes.routes();

export default crudRoutes.router;