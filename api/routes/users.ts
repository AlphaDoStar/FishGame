import * as express from 'express';
import * as mongoose from 'mongoose';
import User from '../models/users';
import { client } from '../../server';

const router = express.Router();

router.get('/', (_req: any, res: any) => {
    User.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req: any, res: any) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        money: req.body.money
    });

    user.save()
        .then(result => {
            console.log(result);
            client.user.setActivity(`새로운 유저, ${req.body.name} 님이 가입했어요!`, { type: 'LISTENING' });
            res.status(201).json({
                message: 'Handling POST requests to /users',
                createdUser: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:userId', (req: any, res: any) => {
    const id = req.params.userId;

    User.findById(id)
        .exec()
        .then(doc => {
            console.log('From database', doc);

            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/:userId', (req: any, res: any) => {
    const id = req.params.userId;
    const update = {};

    for (const ops of req.body) {
        update[ops.propName] = ops.value;
    }

    User.updateOne({ _id: id }, { $set: update })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:userId', (req: any, res: any) => {
    const id = req.params.userId;

    User.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

export default router;