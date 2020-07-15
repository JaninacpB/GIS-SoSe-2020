"use strict";
var eisdiele;
(function (eisdiele) {
    let urlSendenZu = "/lesen";
    urlSendenZu = "https://sosegis2020.herokuapp.com" + "/lesen";
    datenbankAuslesen();
    async function datenbankAuslesen() {
        let response = await fetch(urlSendenZu);
        let ausgabeText = await response.text();
        console.log(ausgabeText);
        console.log("Help");
        let antwort = document.createElement("p");
        antwort.innerHTML = ausgabeText;
        document.getElementById("flexboxFuerAusgaben").appendChild(antwort);
    }
})(eisdiele || (eisdiele = {}));
//# sourceMappingURL=ausgabeDatenbank.js.map