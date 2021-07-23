import * as Discord from 'discord.js';
import * as express from 'express';
import * as moment from 'moment';
import * as mongoose from 'mongoose';

import userRoutes from './api/routes/users';

require('dotenv').config();

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const MONGO_URL = process.env.MONGO_URL || '';
const SERVER_PORT = Number(process.env.SERVER_PORT) || 5000;
const STATUS_TERM = 10000;

const app = express();
export const client = new Discord.Client();
const status = [
    'AlphaDo Bot FishGame',
    `Listening on port ${SERVER_PORT}...`,
];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (_req: any, res: any) => {
    res.send('Hello, world!');
});

app.use('/users', userRoutes);

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}...`);
});

client.once('ready', () => {
    //let index = 0;

    console.log(`Logged in as ${client.user.tag}!`);
    /*setInterval(async () => {
        await client.user.setActivity(
            status[
                index === status.length ?
                (index = 0, index ++) :
                index ++
            ], {
                type: 'PLAYING'
            }
        );
    }, STATUS_TERM);*/
});

client.on('message', (msg: Discord.Message) => {
    if (msg.content === 'ping') {
        msg.channel.send('pong');
    }

    if (msg.content.startsWith("유저")) {
        const user = msg.mentions.users.first() || msg.author;
        const member = msg.guild.members.cache.get(msg.author.id);
        const embed = new Discord.MessageEmbed()
            .setColor("FFB6C1")
            .setTitle("유저 정보")
            .setAuthor(user.tag, user.avatarURL())
            .setThumbnail(user.avatarURL())
            .addField("이름", user.username, true)
            .addField("태그", user.tag, true)
            .addField("서버 참가", moment.utc(member.joinedAt).format("Y MM/D"), true)
            .addField("계정 생성", moment.utc(msg.author.createdAt).format("Y MM/D"), true);

        msg.channel.send(embed);
    }
});

(async function () {
    await client.login(BOT_TOKEN);

    await mongoose
        .connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        .then(() => {
            console.log('MongoDB connected...');
        })
        .catch(err => {
            console.error(`Connection error : ${err}`);
        });
})();