namespace eisdiele {


    let urlSendenZu: string = "/lesen";
    urlSendenZu = "https://sosegis2020.herokuapp.com" + "/lesen";

    datenbankAuslesen();


    async function datenbankAuslesen(): Promise <void> {

        let response: Response = await fetch(urlSendenZu);
        let ausgabeText: string = await response.text();
        
        console.log(ausgabeText);
        
        let antwort: HTMLElement = document.createElement("p");
        antwort.innerHTML = ausgabeText;
        document.getElementById("flexboxFuerAusgaben")!.appendChild(antwort);

    }

}