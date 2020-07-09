"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eisdiele = void 0;
const Http = require("http");
const Mongo = require("mongodb");
var eisdiele;
(function (eisdiele) {
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    async function handleRequest(_request, _response) {
        console.log("I'm running!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        /*Hier Antwort */
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        _response.end();
    }
})(eisdiele = exports.eisdiele || (exports.eisdiele = {}));
//# sourceMappingURL=server.Eiskoenigin.js.map