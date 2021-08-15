import { ConnectOptions, createConnection } from 'mongoose';

import MainUserSchema from './Main/User';
import MainRoomSchema from './Main/Room';
import FishGameUserSchema from './FishGame/User';

const options: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
    autoIndex: false
};

let model: object = null;

export async function createModels(mongoURI: string) {
    const MainDB = await createConnection(`${mongoURI}/Main`, options);
    const FishGameDB = await createConnection(`${mongoURI}/FishGame`, options);

    const MainUserModel = MainDB.model('User', MainUserSchema);
    const MainRoomModel = MainDB.model('Room', MainRoomSchema);
    const FishGameUserModel = FishGameDB.model('User', FishGameUserSchema);

    model = {
        Main: {
            User: MainUserModel,
            Room: MainRoomModel
        },
        FishGame: {
            User: FishGameUserModel
        }
    };

    return model;
}

export function getModel(): Promise<any> {
    if (model)
        return Promise.resolve(model);

    return null;
}