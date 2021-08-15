import { Router, Request, Response } from "express";
import * as mongoose from 'mongoose';

import { getModel } from "../../models/model";
import { IMainRoom } from "../../models/Main/Room";

const router: Router = Router();

router.get('/', async (_req: Request, res: Response) => {
    const Room: mongoose.Model<IMainRoom> = (await getModel())?.Main.Room;

    Room.find()
        .exec()
        .then((docs: object) => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch((err: Error) => {
            console.log(err);
            res.status(500).json({
                err
            });
        });
});

router.post('/', async (req: Request, res: Response) => {
    const Room: mongoose.Model<IMainRoom> = (await getModel())?.Main.Room;
    const room = new Room({
        _id: new mongoose.Types.ObjectId(),
        group: req.body.group,
        managers: req.body.managers,
        name: req.body.name,
        prefix: req.body.prefix,
        separator: req.body.separator,
        start: req.body.start,
        type: req.body.type
    });

    await room.save()
        .then((result: object) => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /rooms',
                createdRoom: result
            });
        })
        .catch((err: Error) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});