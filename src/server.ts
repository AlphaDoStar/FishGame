import { Client, Message, MessageEmbed } from 'discord.js';
import { config } from 'dotenv'
import * as express from 'express';
import { utc } from 'moment';
import { connect } from 'mongoose';

import userRoutes from './routes/Main/users';

config();

const BOT_TOKEN: string = process.env.BOT_TOKEN || '';
const MONGO_URI: string = process.env.MONGO_URI || '';//
const SERVER_PORT: number = 5000;
const STATUS_TERM: number = 10000;

const app = express();
export const client: Client = new Client();
const status: string[] = [
    'AlphaDo Bot FishGame',
    `Listening on port ${SERVER_PORT}...`,
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/main/users', userRoutes);

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}...`);
});

client.once('ready', () => {
    let index = 0;

    console.log(`Logged in as ${client.user.tag}!`);
    setInterval(async () => {
        await client.user.setActivity(
            status[
                index === status.length ?
                (index = 0, index ++) :
                index ++
            ], {
                type: 'PLAYING'
            }
        );
    }, STATUS_TERM);
});

client.on('message', (msg: Message) => {
    if (msg.content === 'ping') {
        msg.channel.send('pong');
        msg.channel.send(JSON.stringify(msg, null, 4));
        msg.channel.send(JSON.stringify(msg.author, null, 4));
    }

    if (msg.content.startsWith("유저")) {
        const user = msg.mentions.users.first() || msg.author;
        const member = msg.guild.members.cache.get(msg.author.id);
        const embed = new MessageEmbed()
            .setColor("FFB6C1")
            .setTitle("유저 정보")
            .setAuthor(user.tag, user.avatarURL())
            .setThumbnail(user.avatarURL())
            .addField("이름", user.username, true)
            .addField("태그", user.tag, true)
            .addField("서버 참가", utc(member.joinedAt).format("Y MM/D"), true)
            .addField("계정 생성", utc(msg.author.createdAt).format("Y MM/D"), true);

        msg.channel.send(embed);
    }
});

(async function () {
    // Connect to Discord
    await client.login(BOT_TOKEN);

    // Connect to MongoDB
    await connect(`${MONGO_URI}fishGame`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        .then(() => {
            console.log('MongoDB connected...');
        })
        .catch((err: any) => {
            console.error(`Connection error : ${err.message}`);
            process.exit(1);
        });
})();