const log = [];

let socket = null;
let writeln = (text) => {};

new java.lang.Thread({
    run: function () {
        try {
            socket = new java.net.Socket();
            
            log.push('연결 요청');
            socket.connect(new java.net.InetSocketAddress('localhost', 3000));
            
            if (socket.isConnected()) {
                log.push('연결 성공');
                log.push(socket.close);
                
                try {
                    new java.lang.Thread({
                        run: function () {
                            while (true) {
                                try {
                                    const input = socket.getInputStream();
                                    const output = socket.getOutputStream();
                                    const reader = new java.io.BufferedReader(new java.io.InputStreamReader(input));
                                    const writer = new java.io.PrintWriter(output, true);
                                    
                                    writeln = (text) => {
                                        log.push('클라이언트 : ' + text);
                                        writer.println(text);
                                    }
                                    
                                    let line = '';
                                    
                                    while ((line = reader.readLine()) !== null) {
                                        if (line === '') break;
                                        log.push(line);
                                    }

                                    writer.flush();
                                    input.close();
                                    output.close();
                                } catch (err) {
                                    log.push(err.message);
                                }
                            }
                        }
                    }).start();
                } catch (err) {
                    socket.close();
                    log.push(err.message);
                }
            } else {
                log.push('연결 실패');
            }
        } catch(err) {
            log.push(err.message);
        }
    }
}).start();

function response(_room, msg, _sender, _isGroupChat, replier) {
    if (msg === 'log')
        replier.reply(log.join('\n\n'));
        
    if (msg === 'close')
        replier.reply(server.close());
        
    if (msg === 'p') {
        replier.reply('Hello');
        writeln('Hello');
    }
}