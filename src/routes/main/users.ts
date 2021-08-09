import { Router, Request, Response } from 'express';
import * as mongoose from 'mongoose';

import { client } from '../../server';
import { getModel } from '../../models/model';
import { IMainUser } from '../../models/Main/User';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
    const User: mongoose.Model<IMainUser> = (await getModel())?.Main.User;

    User.find()
        .exec()
        .then((docs: object) => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch((err: Error) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', async (req: Request, res: Response) => {
    const User: mongoose.Model<IMainUser> = (await getModel())?.Main.User;
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        account: req.body.account,
        authority: req.body.authority,
        birth: req.body.birth,
        email: req.body.email,
        join: req.body.join,
        mileage: req.body.mileage,
        name: req.body.name,
        profile: req.body.profile,
        sponsorship: req.body.sponsorship
    });

    await user.save()
        .then((result: object) => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /users',
                createdUser: result
            });
        })
        .catch((err: Error) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:userId', async (req: Request, res: Response) => {
    const User: mongoose.Model<IMainUser> = (await getModel())?.Main.User;
    const id = req.params.userId;

    User.findById(id)
        .exec()
        .then((doc: object) => {
            console.log('From database', doc);

            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                });
            }
        })
        .catch((err: Error) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/:userId', async (req: Request, res: Response) => {
    const User: mongoose.Model<IMainUser> = (await getModel())?.Main.User;
    const id = req.params.userId;
    const update = req.body;

    User.updateOne({ _id: id }, { $set: update })
        .exec()
        .then((result: object) => {
            res.status(200).json(result);
        })
        .catch((err: Error) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:userId', async (req: Request, res: Response) => {
    const User: mongoose.Model<IMainUser> = (await getModel())?.Main.User;
    const id = req.params.userId;

    User.deleteOne({ _id: id })
        .exec()
        .then((result: object) => {
            res.status(200).json(result);
        })
        .catch((err: Error) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

export default router;