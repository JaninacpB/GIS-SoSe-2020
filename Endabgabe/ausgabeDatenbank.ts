namespace eisdiele {

    let urlSendenZu: string = "/lesen";
    urlSendenZu = "https://sosegis2020.herokuapp.com" + "/lesen";

    console.log("Help");
    datenbankAuslesen();

    async function datenbankAuslesen(): Promise <void> {

        let response: Response = await fetch(urlSendenZu);
        let ausgabeText: string = await response.text();
        
        console.log(ausgabeText);
        console.log("Help");
        
        let antwort: HTMLElement = document.createElement("p");
        antwort.innerHTML = ausgabeText;
        document.getElementById("flexboxFuerAusgaben")!.appendChild(antwort);

    }

}