import { Document, Schema, Types } from 'mongoose';

/**
 * Interface to model the Main Room Schema for TypeScript.
 * @param group:boolean isGroupChat
 * @param managers:string[] managerList
 * @param name:string name
 * @param prefix:object commandPrefixSetting
 * @param separator:object commandSeparatorSetting
 * @param start:Date supportStartDate
 * @param type:string type[kakaotalk, discord, etc.]
 */
export interface IMainRoom extends Document {
    group: boolean;
    managers: string[];
    name: string;
    prefix: object;
    separator: object;
    start: Date;
    type: string;
}

export default new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: new Types.ObjectId()
    },
    group: {
        type: Boolean,
        required: true
    },
    managers: {
        type: [String],
        default: []
    },
    name: {
        type: String,
        required: true
    },
    prefix: {
        default: {
            type: String,
            default: '/'
        },
        fishGame: {
            type: String,
            default: '/'
        }
    },
    separator: {
        default: {
            type: String,
            default: ' '
        },
        fishGame: {
            type: String,
            default: ' '
        }
    },
    start: {
        type: Date,
        default: Date.now()
    },
    type: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});