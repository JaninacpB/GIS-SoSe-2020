"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eisdiele = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var eisdiele;
(function (eisdiele) {
    let bestellungen;
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    let databaseUrl = "mongodb+srv://janinaBach:1234@janinabach.ospoe.mongodb.net/Eiskoenigin?retryWrites=true&w=majority";
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Server läuft auf Port: " + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        bestellungen = mongoClient.db("Eiskoenigin").collection("orders");
        console.log("Datenbank verbunden ist:", bestellungen != undefined);
    }
    async function handleRequest(_request, _response) {
        console.log("I'm running!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            if (url.pathname == "/eingabe") {
                let _jsonString = JSON.stringify(url.query);
                _response.write(_jsonString);
                storeOrder(url.query);
                console.log("Lese neue Daten ein");
            }
            if (url.pathname == "/lesen") {
                let speicher = bestellungen.find();
                let speicherArray = await speicher.toArray();
                _response.write(JSON.stringify(speicherArray));
            }
            if (url.pathname == "/loeschen") {
                bestellungen.drop();
                console.log("alles gelöscht");
            }
            if (url.pathname == "/bearbeiten") {
                // irgendwas mit update()
                console.log(url.pathname);
                console.log(url.path);
                console.log(url.search);
                console.log("UrlBearbeiten: " + url);
                //let value: string = <string> url["_id"];
                //console.log("Value: " + value);
                //let zuaendernesObjektId: Mongo.ObjectID = new Mongo.ObjectID(value);
                /* console.log("ZuänderdesObjektid: " + zuaendernesObjektId);
        
                bestellungen.update({ "_id": zuaendernesObjektId }, { $set: { "geschmolzen": "true" } });
         */
                console.log("dieser Eintrag ist geschmolzen");
            }
        }
        _response.end();
    }
    function storeOrder(_order) {
        bestellungen.insert(_order);
    }
})(eisdiele = exports.eisdiele || (exports.eisdiele = {}));
//# sourceMappingURL=serverEiskoenigin.js.map