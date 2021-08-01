import { Router, Request, Response } from 'express';
import * as mongoose from 'mongoose';

import User from '../../models/main/User';
import { client } from '../../server';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
    User.find()
        .exec()
        .then((docs: any) => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch((err: any) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', async (req: Request, res: Response) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        account: req.body.account,
        authority: req.body.authority,
        birth: req.body.birth,
        email: req.body.email,
        join: req.body.join,
        name: req.body.name,
        sponsorship: req.body.sponsorship
    });

    await user.save()
        .then((result: any) => {
            console.log(result);
            client.user.setActivity(`새로운 유저, ${req.body.name} 님이 가입했어요!`, { type: 'LISTENING' });
            res.status(201).json({
                message: 'Handling POST requests to /users',
                createdUser: result
            });
        })
        .catch((err: any) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:userId', (req: Request, res: Response) => {
    const id = req.params.userId;

    User.findById(id)
        .exec()
        .then((doc: any) => {
            console.log('From database', doc);

            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                });
            }
        })
        .catch((err: any) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/:userId', (req: Request, res: Response) => {
    const id = req.params.userId;
    const update = {};

    for (const ops of req.body) {
        update[ops.propName] = ops.value;
    }

    User.updateOne({ _id: id }, { $set: update })
        .exec()
        .then((result: any) => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch((err: any) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:userId', (req: Request, res: Response) => {
    const id = req.params.userId;

    User.deleteOne({ _id: id })
        .exec()
        .then((result: any) => {
            res.status(200).json(result);
        })
        .catch((err: any) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

export default router;