const http = require('http');
class Server {
    constructor(port) {
        this.port = port;
        this.server = http.createServer(this.handleRequest.bind(this));
    }
    handleRequest(request, response) {
        if (request.url === '/runKey') {
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end('{key:"ok"}');
        } else if (request.url === '/pass') {
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end('{key:"no"}');
        } else {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.end('404 Not Found');
        }
    }
    start() {
        this.server.listen(this.port, () => {
            console.log(`Server running at http://127.0.0.1:${this.port}/`);
        });
    }
}
module.exports = Server;