import { createServer, Socket } from 'net';

const server = createServer((socket: Socket) => {
    console.log('클라이언트 접속');
    socket.write('웰컴');

    socket.on('data', (chunk: Buffer) => {
        console.log(`클라이언트 : ${chunk.toString()}`);
    });

    socket.on('end', () => {
        console.log('클라이언트 접속 종료');
    });
});

server.on('listening', () => {
    console.log('서버가 듣고 있어요...');
});

server.on('close', () => {
    console.log('서버가 닫혔어요.');
});

server.listen(3000);