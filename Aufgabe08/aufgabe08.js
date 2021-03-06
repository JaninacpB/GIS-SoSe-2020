"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A09Server = void 0;
const Http = require("http");
var A09Server;
(function (A09Server) {
    //Bestätigung, dass der Code läuft
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    // Listener, reagiert wenn etwas ankommt  
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    // Handler für Listener, schreibt in Console
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log(_request.url);
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(_request.url);
        _response.end();
    }
})(A09Server = exports.A09Server || (exports.A09Server = {}));
//# sourceMappingURL=aufgabe08.js.map