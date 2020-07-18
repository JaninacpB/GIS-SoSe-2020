"use strict";
var Eisdiele;
(function (Eisdiele) {
    let flexbox = document.getElementById("flexbox");
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
    function erstellBestellungHtml(_aktuellerIndex, _aktuelleBestellung) {
        let div = htmlElementErstellen(flexbox, "div", "bestellungBox");
        let buttonArtikel = erstellButton(div, "Geschmolzen eintragen in Datenbank", "bearbeitenButton");
        buttonArtikel.addEventListener("click", handlerArtikelBearbeiten);
        htmlElementErstellen(div, "p", "bestellung").innerHTML = "Artikel " + (_aktuellerIndex + 1);
        htmlElementErstellen(div, "p", "bestellung").innerHTML = "Eissorten: " + _aktuelleBestellung[_aktuellerIndex].eiskugel;
        if (_aktuelleBestellung[_aktuellerIndex].topping) {
            htmlElementErstellen(div, "p", "bestellung").innerHTML = "Topping: " + _aktuelleBestellung[_aktuellerIndex].topping;
        }
        htmlElementErstellen(div, "p", "bestellung").innerHTML = "Preis: " + _aktuelleBestellung[_aktuellerIndex].preis + "€";
        htmlElementErstellen(div, "p", "bestellung").innerHTML = "Besteller: " + _aktuelleBestellung[_aktuellerIndex].nachname + ", " + _aktuelleBestellung[_aktuellerIndex].vorname;
        htmlElementErstellen(div, "p", "bestellung").innerHTML = "Adresse: " + _aktuelleBestellung[_aktuellerIndex].strasse + ", " + _aktuelleBestellung[_aktuellerIndex].stadt;
        if (_aktuellerIndex + 1 == _aktuelleBestellung.length) {
            let allesLoschenButton = erstellButton(flexbox, "Lösch alles!", "weiter");
            allesLoschenButton.addEventListener("click", handlerLoeschen);
        }
        function handlerArtikelBearbeiten() {
            let urlSendenZu;
            let id = _aktuelleBestellung[_aktuellerIndex]._id + "";
            urlSendenZu = "https://sosegis2020.herokuapp.com" + "/bearbeiten?" + "id=" + id;
            fetch(urlSendenZu);
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
    function htmlElementErstellen(_elternElement, _artElement, classe) {
        let element = document.createElement(_artElement);
        element.setAttribute("class", classe);
        _elternElement.appendChild(element);
        return element;
    }
    function erstellButton(_elternElement, _text, _textClass) {
        let button = document.createElement("button");
        _elternElement.appendChild(button);
        button.setAttribute("class", _textClass);
        button.innerHTML = _text;
        return button;
    }
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=ausgabeDatenbank.js.map