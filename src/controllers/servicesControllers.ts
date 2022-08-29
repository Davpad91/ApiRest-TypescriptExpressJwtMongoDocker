import {ObjectId} from 'mongodb'; 
import {Request, Response} from 'express';
import { IUser, User } from '../models/userSchema';

export async function getUserAllController(_req: Request, res: Response){
    try{
    const user = await User.getUserAll();
    res.json(user);
    }catch(error)
    {
        res.status(480).json({status: 480, message: 'Cannot find data in database'});
    };
 };

export async function getUserController(req: Request, res: Response){
    try{
        const user = await User.getUser(new ObjectId(req.params.id));
        if (!user) {
            res.status(404).json({status: 404, message: 'User not found in database'});
        }
        res.json(user)
    }catch(error){
        res.status(400).json({status: 400, message: 'Verify the id, user not exist in database'});
    };
};

export async function createUserController(req:Request, res: Response){
    try{
        const user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({msg: 'User already exists in the database'});
        }
        const newUser = await User.createUser(req.body);
        res.json(newUser);
    }catch(error){
        res.status(400).json({'msg': 'Sign up failed, please check all the fields'});
    }
}

export async function deleteUserController(req:Request, res: Response){
    try{
        const user = await User.deletUser(new ObjectId(req.params.id));
        res.status(200).send({'Message': `User ${user.name} was deleted  successfully`});
    }catch(error){
        res.status(400).json({status: 400, message: 'Cannot delete user'});
    }
}

export const updateUserController = async (req:Request, res: Response) => {
    try{
        if (req.body._id || req.body.createdAt || req.body.updatedAt) {
            res.status(400).send({'Message': 'Cannot update this fields, your not allowed to update this fields'});
        };
        const user = await User.findOne({id: req.userId});
        const update : IUser = await User.updateUser(req.body, user);
        res.json(update);
    }catch(error){
       res.status(400).json({status: 400, message: 'Error: Update failed'});
    };
};