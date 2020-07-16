"use strict";
var eisdiele;
(function (eisdiele) {
    let flexbox = document.getElementById("flexbox");
    /* htmlElementErstellen( flexbox, "div", ""); */
    let urlSendenZu;
    let bestellung;
    urlSendenZu = "https://sosegis2020.herokuapp.com" + "/lesen";
    datenbankAuslesen();
    async function datenbankAuslesen() {
        let response = await fetch(urlSendenZu);
        bestellung = await response.json();
        for (let index = 0; index < bestellung.length; index++) {
            erstellBestellungHtml(index, bestellung);
        }
    }
    function erstellBestellungHtml(aktuellerIndex, aktuelleBestellung) {
        let div = htmlElementErstellen(flexbox, "div", "bestellungBox");
        erstellButton(div, "Erledigt", "bearbeitenButton");
        htmlElementErstellen(div, "p", "bestellung").innerHTML = "Artikel " + (aktuellerIndex + 1);
        htmlElementErstellen(div, "p", "bestellung").innerHTML = "Eissorten: " + aktuelleBestellung[aktuellerIndex].name;
        htmlElementErstellen(div, "p", "bestellung").innerHTML = "Preis: " + aktuelleBestellung[aktuellerIndex].preis;
        htmlElementErstellen(div, "p", "bestellung").innerHTML = "Versandadresse: " + aktuelleBestellung[aktuellerIndex].nachname + ", " + aktuelleBestellung[aktuellerIndex].vorname;
        htmlElementErstellen(div, "p", "bestellung").innerHTML = aktuelleBestellung[aktuellerIndex].strasse + ", " + aktuelleBestellung[aktuellerIndex].stadt;
        if (aktuellerIndex + 1 == aktuelleBestellung.length) {
            let allesLoschenButton = erstellButton(flexbox, "Lösch alles!", "weiter");
            allesLoschenButton.addEventListener("click", handlerLoeschen);
        }
    }
    function handlerLoeschen() {
        let urlSendenZu;
        urlSendenZu = "https://sosegis2020.herokuapp.com" + "/loeschen";
        fetch(urlSendenZu);
        for (let index = 0; index < (bestellung.length * 2); index++) {
            flexbox.firstChild?.remove();
            console.log("hello");
        }
    }
    function htmlElementErstellen(elternElement, artElement, classe) {
        let element = document.createElement(artElement);
        element.setAttribute("class", classe);
        elternElement.appendChild(element);
        return element;
    }
    function erstellButton(elternElement, text, textClass) {
        let button = document.createElement("button");
        elternElement.appendChild(button);
        button.setAttribute("class", textClass);
        button.innerHTML = text;
        return button;
    }
})(eisdiele || (eisdiele = {}));
//# sourceMappingURL=ausgabeDatenbank.js.map