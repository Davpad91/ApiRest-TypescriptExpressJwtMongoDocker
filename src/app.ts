import express from 'express'
import passport from 'passport'
import cors from 'cors';
import morgan from 'morgan';

import routs from './routers/indexRoutes'
import loginRouts from './routers/loginRoutes'
import specialRouts from './routers/specialRoutes'
import devicesRouts from './routers/devicesRoutes'

const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
//passport.use(passportMiddleware);

// app.get('/', (_req, res) => {
//     return res.send(`The API is at http://localhost:${app.get('port')}`);
// })

//routes
app.use("/", routs);
app.use("/", loginRouts);
app.use("/", specialRouts);
app.use("/", devicesRouts);

export default app;