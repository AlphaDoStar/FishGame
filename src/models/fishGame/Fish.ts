import * as mongoose from 'mongoose';

const fishSchema = new mongoose.Schema({
    length: Number,
    locked: {
        type: Boolean,
        default: false
    },
    name: String,
    tier: String
});

export default fishSchema;