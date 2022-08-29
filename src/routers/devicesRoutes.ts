import * as devices from '../controllers/devicesControllers'
import {Router} from 'express';

class DevicesRoutes {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
    
    routes(): void {
        this.router.patch('/device/:id', devices.updateDeviceController);
        this.router.delete('/device/:id', devices.deleteDeviceController);
        this.router.get('/device/:id', devices.getDeviceController)
    }
}

const devicesRouts = new DevicesRoutes();
devicesRouts.routes();

export default devicesRouts.router;