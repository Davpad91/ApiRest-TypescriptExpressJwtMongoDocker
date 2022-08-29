import mongoose from "mongoose";

class Connection {
    private static _instance: Connection;

    private constructor(){
        mongoose.connect('mongodb://mongo/mydatabase')
            .then(() => console.log('Connected to Database'))
            .catch((error) => console.log('Connection failed', error))

    };
    static getInstance(){
        if(this._instance){
            return this._instance;
        }
        this._instance = new Connection();
        return this._instance
    }
};

export default Connection