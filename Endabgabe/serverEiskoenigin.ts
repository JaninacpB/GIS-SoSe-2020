import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace eisdiele {

  interface Order {
    [type: string]: string | string[] | undefined;
  }

  let bestellungen: Mongo.Collection;

  let port: number | string | undefined = process.env.PORT;
  if (port == undefined)
    port = 5001;

  let databaseUrl: string = "mongodb+srv://janinaBach:1234@janinabach.ospoe.mongodb.net/Eiskoenigin?retryWrites=true&w=majority";

  startServer(port);
  connectToDatabase(databaseUrl);

  function startServer(_port: number | string): void {
    let server: Http.Server = Http.createServer();
    console.log("Server läuft auf Port: " + _port);

    server.listen(_port);
    server.addListener("request", handleRequest);
  }

  async function connectToDatabase(_url: string): Promise<void> {
    let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();
    bestellungen = mongoClient.db("Eiskoenigin").collection("orders");
    console.log("Datenbank verbunden ist:", bestellungen != undefined);
  }

  async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
    console.log("I'm running!");

    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");

    if (_request.url) {
      let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);

      if (url.pathname == "/eingabe") {
        let _jsonString: string = JSON.stringify(url.query);
        _response.write(_jsonString);

        storeOrder(url.query);
        console.log("Lese neue Daten ein");
      }

      if (url.pathname == "/lesen") {
        let speicher: Mongo.Cursor<string> = bestellungen.find();
        let speicherArray: string[] = await speicher.toArray();
        _response.write(JSON.stringify(speicherArray));
      }

      if (url.pathname == "/loeschen") {
        bestellungen.drop();
        console.log("alles gelöscht");
      }

      if (url.pathname == "/bearbeiten") {
        console.log(url.query);
        for (let key in url.query) {
          let wert: string = <string>url.query[key];
          let objekt: Mongo.ObjectID = new Mongo.ObjectID(wert);
          bestellungen.updateOne({ "_id": objekt }, { $set: { "geschmolzen": "true" } });
          console.log("Geschmolzen ist: " + objekt);
        }
      }
    }
    _response.end();
  }

  function storeOrder(_order: Order): void {
    bestellungen.insert(_order);
  }
}