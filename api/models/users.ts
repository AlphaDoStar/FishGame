import * as mongoose from 'mongoose';

export default mongoose.model(
    'User',
    new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: {
            type: String,
            unique: true
        },
        money: {
            type: Number,
            default: 1000
        }
    }, {
       versionKey: false
    })
);