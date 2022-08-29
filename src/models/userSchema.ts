import  {Schema, model, Document, Model} from 'mongoose';
import {ObjectId} from 'mongodb'; 
import bcrypt from 'bcrypt';

export interface IUserAttrs {
    name: string
    email: string;
    password: string;
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    comprobePasswords: (password: string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {
    build(attrs: IUserAttrs): IUser;
    createUser(attrs: IUserAttrs): Promise<IUser>;
    getUserAll(): Promise<IUser>;
    getUser(id: ObjectId) : Promise<IUser>;
    deletUser(id: ObjectId) : Promise<IUser>;
    updateUser(attrs: IUserAttrs, attrs2: IUserAttrs) : Promise<IUser>;
}

const UserSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    email:{
        type: String,
        unique: true,
        lowercase:true,
        trim:true,
        required:true
    },
    password:{
        type: String,
        required: true
    } 
},{versionKey: false, timestamps: true});

UserSchema.pre<IUser>("save", async function(next){
    const schema = this;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(schema.password, salt); 
    schema.password = hash;
        if(!schema.isNew) {
            if(!schema.isModified('password')){
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(schema.password, salt); 
                schema.password = hash;
           }
           const restricted = ['_id', 'createdAt', 'updatedAt'];
           const updates = schema.modifiedPaths();
           const invalidFields = updates.every(fields => restricted.includes(fields));
           next(invalidFields ? new Error ('Cannot update _id, createdAt, updatedAt fields, check the fields') : undefined); 
        }
        next();
});

UserSchema.statics.build = function(attrs: IUserAttrs) {
    return new User(attrs);
};

UserSchema.statics.createUser = function(attrs: IUserAttrs) {
    const user = User.build(attrs);
    return user.save();
};

UserSchema.statics.getUserAll = function(){
    return User.find().select('-password');
};

UserSchema.statics.getUser = function(id: ObjectId){
    return User.findOne({_id: id}).select('-password');
};

UserSchema.statics.deletUser = function(id: ObjectId){
    return User.findByIdAndRemove({_id: id});
};

UserSchema.statics.updateUser = function(attrs: { [key: string]: any}, attrs2: { [key: string]: any}) {
    const user = Object.keys(attrs);
    user.forEach(field =>{
         attrs2[field] = attrs[field]
    })
    return attrs2.save();
};

UserSchema.methods.comprobePasswords = async function(password: string): Promise<Boolean> {
    const schema = this;
    return await bcrypt.compare(password, schema.password);
  };

export const User = model<IUser, IUserModel>('User', UserSchema);