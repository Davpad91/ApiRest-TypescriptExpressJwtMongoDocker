import {Router} from "express";
import * as services from '../controllers/servicesControllers';
import * as devices from '../controllers/devicesControllers'
import {decodeTocken} from '../middlewares/verifyToken'

class SpecialRoutes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
    
    routes(): void {
        this.router.get('/users', decodeTocken , services.getUserAllController);
        this.router.patch('/update/:id', decodeTocken,  services.updateUserController);
        this.router.post('/devices', decodeTocken,  devices.createDeviceController);
        this.router.get('/devices', decodeTocken , devices.getDeviceAllController);
    }
}

const specialRouts = new SpecialRoutes();
specialRouts.routes();

export default specialRouts.router;