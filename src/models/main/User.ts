import { Document, Model, model, Schema, Types } from 'mongoose';

/**
 * Interface to model the Main User Schema for TypeScript.
 * @param account:object accountStatus
 * @param authority:string authority
 * @param birth:Date birthday
 * @param email:string emailAddress
 * @param join:Date subscriptionDate
 * @param name:string name
 * @param sponsorship:number sponsoredAmount
 */
export interface IMainUser extends Document {
    account: object;
    authority: string;
    birth: Date;
    email: string;
    join: Date;
    name: string;
    sponsorship: number;
}

const accountSchema = new Schema({
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

const userSchema = new Schema({
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
    name: {
        type: String,
        required: true,
        unique: true
    },
    sponsorship: {
        type: Number,
        default: 0
    }
}, {
    versionKey: false
});

const User: Model<IMainUser> = model('User', userSchema);

export default User;