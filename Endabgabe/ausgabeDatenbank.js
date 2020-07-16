"use strict";
var eisdiele;
(function (eisdiele) {
    let urlSendenZu = "/lesen";
    urlSendenZu = "https://sosegis2020.herokuapp.com" + "/lesen";
    datenbankAuslesen();
    async function datenbankAuslesen() {
        let response = await fetch(urlSendenZu);
        // let ausgabeText: string = await response.text();
        let bestellung = await response.json();
        let antwort = document.createElement("p");
        antwort.innerHTML = bestellung.name[0];
        document.getElementById("h3FuerAusgaben").appendChild(antwort);
    }
})(eisdiele || (eisdiele = {}));
//# sourceMappingURL=ausgabeDatenbank.js.map