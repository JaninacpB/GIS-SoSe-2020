"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A08Server = void 0;
const Http = require("http");
const Url = require("url");
var A08Server;
(function (A08Server) {
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
        // html einrichten
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            if (url.pathname == "/html") {
                for (let key in url.query) {
                    _response.write(key + ":" + url.query[key] + "</br>");
                }
            }
            else {
                let jsonString = JSON.stringify(url.query);
                _response.write(jsonString);
            }
        }
        _response.end();
    }
})(A08Server = exports.A08Server || (exports.A08Server = {}));
//# sourceMappingURL=aufgabe09.js.map