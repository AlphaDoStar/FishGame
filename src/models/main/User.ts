import { Document, Schema, Types } from 'mongoose';

/**
 * Interface to model the Main User Schema for TypeScript.
 * @param { Object } account
 * @param { String } authority
 * @param { Date } birth
 * @param { String } email
 * @param { Date } join
 * @param { Number } mileage
 * @param { String } name
 * @param { Object } profile
 * @param { Number } sponsorship
 */
export interface IMainUser extends Document {
    account: object;
    authority: string;
    birth: Date;
    email: string;
    join: Date;
    mileage: number;
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
    profile: {
        discord: {
            id: {
                type: String,
                unique: true
            },
            login: {
                type: Boolean,
                default: false
            },
            name: {
                type: String,
                unique: true
            }
        },
        kakaotalk: {
            id: {
                type: String,
                unique: true
            },
            login: {
                type: Boolean,
                default: false
            },
            name: {
                type: String,
                unique: true
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