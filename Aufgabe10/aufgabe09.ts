import * as Http from "http";
import * as Url from "url";

export namespace A08Server {
  //Bestätigung, dass der Code läuft
  console.log("Starting server");
  let port: number = Number(process.env.PORT);
  if (!port)
    port = 8100;

  
  // Listener, reagiert wenn etwas ankommt  
  let server: Http.Server = Http.createServer();
  server.addListener("request", handleRequest);
  server.addListener("listening", handleListen);
  server.listen(port);

  // Handler für Listener, schreibt in Console
  function handleListen(): void {
    console.log("Listening");
  }

  function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {

     // html einrichten
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");

    if (_request.url) {
      let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
      
      if (url.pathname == "/html") {
        
        for (let key in url.query) {
          _response.write(key + ":" + url.query[key] + "</br>");
        }

      }
      
      else {
      let jsonString: string = JSON.stringify(url.query);
      _response.write(jsonString);
      }
    }

    _response.end();
  }
}