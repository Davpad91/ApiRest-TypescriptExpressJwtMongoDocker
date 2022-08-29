import {ObjectId} from 'mongodb'; 
import {Request, Response} from 'express';
import {Devices, IDevice} from '../models/deviceSchema';

export async function getDeviceAllController(_req: Request, res: Response)
{
    try{
    const device = await Devices.getDeviceAll();
    console.log(device);
    res.status(200).json(device);
    }catch(error)
    {
        res.status(480).json({status: 404, message: 'Failed searching for devices'});
    }
}

export async function getDeviceController(req: Request, res: Response){
    try{
        const device = await Devices.getDevice(new ObjectId(req.params.id));
        if (!device) {
            res.status(404).json({status: 404, message: 'Error: Device not found'});
        }
        console.log(device);
        res.status(200).json(device);
    }catch(error){
        res.status(400).json({status: 404, message: 'Error: Cannot complete the task'});
    }
}

export async function createDeviceController(req:Request, res: Response){
    try{
    const device = await Devices.findOne({serial: req.body.serial});
    if(device){
        return res.status(400).json({msg: 'Device already exists in the database'});
    }
        const newDevice = await Devices.createDevice(req.body, req.userId);
        res.status(201).json(newDevice);
    }catch(error){
        console.log(error);
        res.status(400).json({status: 400, message: error});
    }
}

export async function deleteDeviceController(req:Request, res: Response){
    try{
        const device = await Devices.deleteDevice(new ObjectId(req.params.id));
        res.json(device);
    }catch(error){
        res.status(400).json({status: 400, message: 'Failed deleting device'});
    };
};

export const updateDeviceController = async (req:Request, res: Response) => {
    try{
        if(req.body._id || req.body.createdAt || req.body.updatedAt || req.body.ownerId) {
            return res.status(400).json({msg: 'Update is invalid, you are not allowed to update this fields'});
        }
        const device = await Devices.findOne({_id: req.params.id});
        if (!device) {
            res.status(404).json({msg: 'Device not found'});
        }
        console.log(device);
        const update : IDevice = await Devices.updateDevice(req.body, device);
        res.status(200).json(update);
    }catch(error){
        res.status(400).json({status: 400, message: 'Failed updating the device'})
    };
};