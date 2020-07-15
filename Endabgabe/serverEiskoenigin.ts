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

  function startServer( _port: number | string): void {
      let server: Http.Server = Http.createServer();
      console.log("Server läuft auf Port: " + _port);

      server.listen(_port);
      server.addListener("request", handleRequest);
  }

  async function connectToDatabase(_url: string): Promise <void> {
    let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true };
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
        
        for (let key in url.query) {
          _response.write(key + ":" + url.query[key] + "</br>");
        }

        let _jsonString: string = JSON.stringify(url.query);
        _response.write(_jsonString);

        storeOrder(url.query);
      }

      if (url.pathname == "/lesen") {
        mongoAntwort(_response);
      }
    }

    _response.end();
  }

  function storeOrder(_order: Order): void {
    bestellungen.insert(_order);
  }

  async function mongoAntwort(_response: Http.ServerResponse): Promise <void> {
    let ausgabe: string[] = await bestellungen.find().toArray();
    _response.write(JSON.stringify(ausgabe));
  }

}