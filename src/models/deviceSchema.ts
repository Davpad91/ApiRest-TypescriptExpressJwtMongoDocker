import { Schema, Document, model, Model} from "mongoose";
import {ObjectId} from 'mongodb'; 

export interface IDeviceUtils{
    ip:string
    name: string 
    serial: string
    owner: string
    ownerId: string
    status: string
};

export interface IDevice extends Document{
    ip:string
    name: string 
    serial: string
    owner: string
    ownerId: string
    status: string
};

export interface IDeviceModel extends Model<IDevice>{
    build(device: IDeviceUtils): IDevice;
    getDeviceAll(): Promise<IDevice>
    getDevice(id: ObjectId): Promise<IDevice>
    deleteDevice(id: ObjectId): Promise<IDevice>
    updateDevice(newDevice: IDeviceUtils, device: IDeviceUtils) : Promise<IDevice>;
    createDevice(device: IDeviceUtils, id: string): Promise<IDevice>
};

const devicesSchema = new Schema({
    ip: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    serial: {
        type: String,
        required: true 
    },
    owner: {
        type: String, 
    },
    ownerId: {
        type: String,
        ref: "User"
    },
    status: {
        type: String,
        required: true
    }
}, {versionKey: false, timestamps: true});

devicesSchema.statics.build = function(device: IDeviceUtils){
    return new Devices(device);
}

devicesSchema.statics.getDeviceAll = function(){
    return Devices.find().populate({
        path: 'ownerId',
        select: '_id name'
    });
};

devicesSchema.statics.getDevice = function(id: ObjectId){
    return Devices.findOne({_id: id}).populate({
        path: 'ownerId',
        select: '_id name'
    });
};

devicesSchema.statics.deleteDevice = function(id: ObjectId){
    return Devices.findByIdAndRemove({_id: id});
}

devicesSchema.statics.updateDevice = function(newDevice: { [key: string]: any}, device: { [key: string]: any}){
    const updateDevice = Object.keys(newDevice);
    updateDevice.forEach(field =>{
        device[field] = newDevice[field]
    });
    return device.save();
}

devicesSchema.statics.createDevice = function(device: IDeviceUtils, _id: string){
    const newdevice = Devices.build(device);    
    newdevice.ownerId = _id;
    console.log(newdevice.ownerId);
    return newdevice.save();
};

export const secondDevice = model<IDeviceUtils, IDevice>('secondDevice', devicesSchema);
export const Devices =  model<IDevice, IDeviceModel>('Devices', devicesSchema);