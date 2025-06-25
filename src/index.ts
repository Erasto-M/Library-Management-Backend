import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import connectToDatabase from './config/db';
import v1Routes from '../src/routes/index';
import { basicRateLimiter } from './middlewares/rate_limit';    
dotenv.config();

const app = express();
//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(basicRateLimiter);


//Routes
app.use('/api/v1', v1Routes);

app.get('/', (req, res)=>{
    const result = {
        success : true, 
        message : "Data is fetched successfully ", 
        data: {
            "name": "Erastus Munyao Kyalo",
            "role": "Software Dev ",
            "age": 21
        }
    }
    res.send(result);
});

app.listen(process.env.PORT, ()=>{
    connectToDatabase();
    console.log(`Server is running on port ${process.env.PORT} `);
});