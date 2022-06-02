import http from 'http';

const server = {};

server.httpServer = http.createServer((req, res) => {
    console.log(req);
    res.end('Sveiki atvyke 🎅');
});

server.init = () => {
    server.httpServer.listen(6969);
}

export { server };