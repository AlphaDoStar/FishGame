import { config } from 'dotenv';
import { ConnectOptions, createConnection } from 'mongoose';

config();

const connectDB = async () => {
    const mongoURI: string = process.env.MONGO_URL;
    const options: ConnectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    };

    await createConnection(`${mongoURI}/FishGame`, options);
    await createConnection(`${mongoURI}/Main`, options);
};