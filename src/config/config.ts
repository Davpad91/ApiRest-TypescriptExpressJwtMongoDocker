export default {
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    DB: {
      URI: process.env.MONGODB_URI || 'mongodb+srv://joanpaduany:010291jp@practica1.qeak3ur.mongodb.net/usersDb?retryWrites=true&w=majority',
      USER: process.env.MONGODB_USER,
      PASSWORD: process.env.MONGODB_PASSWORD
    }
  };