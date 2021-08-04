import { Document, Model, model, Schema, Types } from 'mongoose';

import FishingRod from './fishingRod';
import Fish from './fish';

/**
 * Interface to model the FishGame User Schema for TypeScript.
 * @param bucket:object bucket
 * @param exp:object expreriencePoint
 * @param fishingRod:object fishingRod
 * @param hp:object healthPoint
 * @param level:number level
 * @param location:string location
 * @param mainId:string mainUserId
 * @param money:number money
 * @param name:string name
 * @param progress:object progress
 * @param recoveryRoom:object recoveryRoom
 * @param task:object task
 * @param title:object title
 */
export interface IFishGameUser extends Document {
    bucket: object;
    exp:object;
    fishingRod: object;
    hp: object;
    level: number;
    location: string;
    mainId: string;
    money: number;
    name: string;
    progress: object;
    recoveryRoom: object;
    task: object;
    title: object;
}

const userSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: new Types.ObjectId()
    },
    bucket: {
        contents: {
            type: [Fish],
            default: []
        },
        size: {
            type: Number,
            default: 10
        },
        sortType: {
            type: String,
            default: 'DEFAULT'
        }
    },
    exp: {
        current: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        }
    },
    fishingRod: {
        current: {
            type: String,
            default: '평범한 낚싯대'
        },
        list: {
            type: [FishingRod],
            default: [
                new FishingRod({
                    name: '평범한 낚싯대',
                    probability: {
                        trash: 50,
                        common: 40,
                        rare: 10
                    },
                    tier: 'common'
                })
            ]
        }
    },
    hp: {
        current: {
            type: Number,
            default: 1000
        },
        max: {
            type: Number,
            default: 1000
        }
    },
    level: {
        type: Number,
        default: 1
    },
    location: {
        type: String,
        default: '평화의 숲'
    },
    mainId: {
        type: String,
        required: true
    },
    money: {
        type: Number,
        default: 10000
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    progress: {
        current: {
            type: String,
            default: 'DEFAULT'
        },
        log: {
            type: [String],
            default: []
        }
    },
    recoveryRoom: {
        entry: {
            type: Number,
            default: null
        },
        level: {
            type: Number,
            default: 1
        }
    },
    task: {
        fishing: {
            type: null,
            default: null
        }
    },
    title: {
        current: {
            type: String,
            default: '뉴비'
        },
        list: {
            type: [String],
            default: ['뉴비', 'Noob']
        }
    }
}, {
    versionKey: false
});

const User: Model<IFishGameUser> = model('User', userSchema);

export default User;