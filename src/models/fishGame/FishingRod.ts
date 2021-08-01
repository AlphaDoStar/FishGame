import { Document, Model, model, Schema } from 'mongoose';

/**
 * Interface to model the FishGame FishingRod Schema for TypeScript.
 * @param durability:object durabilityStatus
 * @param level:number level
 * @param name:string name
 * @param probability:object probability
 * @param tier:string tier
 */
export interface IFishingRod extends Document {
    durability: object;
    level: number;
    name: string;
    probability: object;
    tier: string;
}

const fishingRodSchema = new Schema({
    durability: {
        current: {
            type: Number,
            default: 100
        },
        max: {
            type: Number,
            default: 100
        }
    },
    level: {
        type: Number,
        default: 1
    },
    name: {
        type: String,
        required: true
    },
    probability: {
        trash: {
            type: Number,
            default: 100
        },
        common: {
            type: Number,
            default: 0
        },
        rare: {
            type: Number,
            default: 0
        },
        epic: {
            type: Number,
            default: 0
        },
        legendary: {
            type: Number,
            default: 0
        },
        mythic: {
            type: Number,
            default: 0
        },
        transcendent: {
            type: Number,
            default: 0
        },
        eternal: {
            type: Number,
            default: 0
        }
    },
    tier: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

const FishingRod: Model<IFishingRod> = model('FishingRod', fishingRodSchema);

export default FishingRod;