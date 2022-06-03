import http from 'http';

const server = {};

server.httpServer = http.createServer((req, res) => {
    const baseURL = `http${req.socket.encryption ? 's' : ''}://${req.headers.host}/`;
    const parsedURL = new URL(req.url, baseURL);

    console.log(parsedURL);

    res.end('Sveiki atvyke 🎅');
});

server.init = () => {
    server.httpServer.listen(6969);
}

export { server };