import { Document, Schema, Types } from 'mongoose';

/**
 * Interface to model the Main User Schema for TypeScript.
 * @param account:object accountStatus
 * @param authority:string authority
 * @param birth:Date birthday
 * @param email:string emailAddress
 * @param join:Date subscriptionDate
 * @param mileage:number mileage
 * @param name:string name
 * @param profile:object profileStatus
 * @param sponsorship:number sponsoredAmount
 */
export interface IMainUser extends Document {
    account: object;
    authority: string;
    birth: Date;
    email: string;
    join: Date;
    mileage: number;
    name: string;
    profile: object;
    sponsorship: number;
}

const accountSchema = new Schema({ //수정해야 합니다 ~
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

export default new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: new Types.ObjectId()
    },
    account: {
        current: {
            type: String,
            default: null
        },
        list: {
            type: [accountSchema],
            default: []
        }
    },
    authority: {
        type: String,
        default: 'USER'
    },
    birth: {
        type: Date,
        default: null
    },
    email: {
        type: String,
        default: null,
        unique: true
    },
    join: {
        type: Date,
        default: Date.now()
    },
    mileage: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    profile: {
        discord: {
            id: {
                type: String,
                default: null,
                unique: true
            },
            login: {
                type: Boolean,
                default: false
            }
        },
        kakaotalk: {
            id: {
                type: String,
                default: null,
                unique: true
            },
            login: {
                type: Boolean,
                default: false
            }
        }
    },
    sponsorship: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false
});