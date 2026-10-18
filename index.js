const http = require('http');
const Unblocker = require('unblocker');

const port = process.env.PORT || 8080;

const unblocker = new Unblocker({
    prefix: '/proxy/'
});

http.createServer((req, res) => {
    unblocker(req, res, (err) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Error en el proxy: ' + err.stack);
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Página no encontrada. Usa la ruta /proxy/HTTPS://PAGINA-A-DESBLOQUEAR.com');
        }
    });
}).listen(port, () => {
    console.log(`Proxy corriendo en el puerto ${port}`);
});
