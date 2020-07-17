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
        let buttonArtikel = erstellButton(div, "Geschmolzen", "bearbeitenButton");
        buttonArtikel.addEventListener("click", handlerArtikelBearbeiten);
        htmlElementErstellen(div, "p", "bestellung").innerHTML = "Artikel " + (aktuellerIndex + 1);
        htmlElementErstellen(div, "p", "bestellung").innerHTML = "Eissorten: " + aktuelleBestellung[aktuellerIndex].eiskugel;
        if (aktuelleBestellung[aktuellerIndex].topping) {
            htmlElementErstellen(div, "p", "bestellung").innerHTML = "Topping: " + aktuelleBestellung[aktuellerIndex].topping;
        }
        htmlElementErstellen(div, "p", "bestellung").innerHTML = "Preis: " + aktuelleBestellung[aktuellerIndex].preis + "€";
        htmlElementErstellen(div, "p", "bestellung").innerHTML = "Besteller: " + aktuelleBestellung[aktuellerIndex].nachname + ", " + aktuelleBestellung[aktuellerIndex].vorname;
        htmlElementErstellen(div, "p", "bestellung").innerHTML = "Adresse: " + aktuelleBestellung[aktuellerIndex].strasse + ", " + aktuelleBestellung[aktuellerIndex].stadt;
        let geschmolzenText = htmlElementErstellen(div, "p", "bestellung");
        geschmolzenText.innerHTML = "Ist geschmolzen: " + aktuelleBestellung[aktuellerIndex].geschmolzen;
        if (aktuelleBestellung[aktuellerIndex].geschmolzen == "true") {
            div.setAttribute("class", "bestellungBox geschmolzen");
        }
        if (aktuellerIndex + 1 == aktuelleBestellung.length) {
            let allesLoschenButton = erstellButton(flexbox, "Lösch alles!", "weiter");
            allesLoschenButton.addEventListener("click", handlerLoeschen);
        }
        async function handlerArtikelBearbeiten() {
            let urlSendenZu;
            let id = aktuelleBestellung[aktuellerIndex]._id + "";
            urlSendenZu = "https://sosegis2020.herokuapp.com" + "/bearbeiten?" + "id=" + id;
            let response = await fetch(urlSendenZu);
            aktuelleBestellung[aktuellerIndex] = await response.json();
            div.setAttribute("class", "bestellungBox geschmolzen");
            geschmolzenText.innerHTML = "Ist geschmolzen: " + aktuelleBestellung[aktuellerIndex].geschmolzen;
        }
    }
    function handlerLoeschen() {
        let urlSendenZu;
        urlSendenZu = "https://sosegis2020.herokuapp.com" + "/loeschen";
        fetch(urlSendenZu);
        for (let index = 0; index < (bestellung.length * 2); index++) {
            flexbox.firstChild?.remove();
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