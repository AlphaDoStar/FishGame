import * as express from 'express';
import * as mongoose from 'mongoose';

const app: express = express();
const PORT: number = 5000;
const URL: string = 'mongodb+srv://AlphaDo:alphado2761@@alphado.ownc3.mongodb.net/AlphaDo?retryWrites=true&w=majority';

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

(async function () {
    await app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });

    await mongoose
        .connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        .then(() => {
            console.log('MongoDB connected...');
        })
        .catch(err => {
            console.log(`Error : ${err}`);
        });
})();