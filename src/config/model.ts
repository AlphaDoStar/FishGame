import { config } from 'dotenv';
import { Schema } from 'mongoose';

import connection, { connect, options } from "./connection";

config();

interface IModelData {
    connection?: string;
    schema: Schema;
}

const mongoURI: string = process.env.MONGO_URI;

export function model(name: string, data: IModelData) {
    if (data.connection) {
        return connect(`${mongoURI}${data.connection}`, options).model(name, data.schema, name);
    }

    return connection.model(name, data.schema);
}