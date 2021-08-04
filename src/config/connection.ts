import { config } from 'dotenv';
import { ConnectOptions, createConnection } from 'mongoose';

config();

const mongoURI: string = process.env.MONGO_URI;

export const options: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
};

export const connect = createConnection;

export default createConnection(`${mongoURI}Main`, options);