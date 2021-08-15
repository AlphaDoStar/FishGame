'use strict';
const SCRIPT_NAME = 'Account.js';

function response(room, msg, sender, isGroupChat, replier, imageDB) {
    try {
        const USER_ID = new java.lang.String(imageDB.getProfileImage()).hashCode().toString();
        const { BAN_WORDS, OWNER_ID } = Bridge.getScopeOf('Constant');

        [room, msg, sender] = [room, msg, sender].map((e) => e.replace(new RegExp(BAN_WORDS.join('|'), 'g')));

        if (USER_ID !== OWNER_ID && (!isGroupChat)) return;
        

    } catch (err) {

    }
}