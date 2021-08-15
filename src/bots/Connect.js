'use strict';
const SCRIPT_NAME = 'Connect.js';

const URI = 'http://localhost:5000';

const Connection = {
    fishGame: {
        users: connect('fishgame/users')
    },
    main: {
        rooms: connect('main/rooms'),
        users: connect('main/users')
    }
};

function connect(database) {
    return JSON.parse(
        org.jsoup.Jsoup
            .connect(`${URI}/${database}`)
            .ignoreContentType(true)
            .ignoreHttpErrors(true)
            .get().text()
    );
}

function update(database, data) {
    org.jsoup.Jsoup
        .connect(`${URI}/${database}`)
        .ignoreContentType(true)
        .ignoreHttpErrors(true)
        .patch
}

function onStartCompile() {}