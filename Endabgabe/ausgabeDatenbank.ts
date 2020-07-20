namespace Eisdiele {
    let flexbox: HTMLElement = <HTMLElement>document.getElementById("flexbox");
    let urlSendenZu: string;
    let bestellung: Bestellung[];
    urlSendenZu = "https://sosegis2020.herokuapp.com" + "/lesen";
    datenbankAuslesen();

    async function datenbankAuslesen(): Promise<void> {
        let response: Response = await fetch(urlSendenZu);
        bestellung = await response.json();

        for (let index: number = 0; index < bestellung.length; index++) {
            erstellBestellungHtml(index, bestellung);
        }
    }

    function erstellBestellungHtml(_aktuellerIndex: number, _aktuelleBestellung: Bestellung[]): void {
        let div: HTMLElement = htmlElementErstellen(flexbox, "div", "bestellungBox");
        let buttonArtikel: HTMLButtonElement;

        if (! _aktuelleBestellung[_aktuellerIndex].geschmolzen) {
            buttonArtikel = <HTMLButtonElement>erstellButton(div, "Geschmolzen eintragen in Datenbank", "bearbeitenButton");
            buttonArtikel.addEventListener("click", handlerArtikelBearbeiten);
        }
        htmlElementErstellen(div, "p", "bestellung").innerHTML = "Artikel " + (_aktuellerIndex + 1);
        htmlElementErstellen(div, "p", "bestellung").innerHTML = "Eissorten: " + _aktuelleBestellung[_aktuellerIndex].eiskugel;
        if (_aktuelleBestellung[_aktuellerIndex].topping) {
            htmlElementErstellen(div, "p", "bestellung").innerHTML = "Topping: " + _aktuelleBestellung[_aktuellerIndex].topping;
        }
        htmlElementErstellen(div, "p", "bestellung").innerHTML = "Preis: " + _aktuelleBestellung[_aktuellerIndex].preis + "€";
        htmlElementErstellen(div, "p", "bestellung").innerHTML = "Besteller: " + _aktuelleBestellung[_aktuellerIndex].nachname + ", " + _aktuelleBestellung[_aktuellerIndex].vorname;
        htmlElementErstellen(div, "p", "bestellung").innerHTML = "Adresse: " + _aktuelleBestellung[_aktuellerIndex].strasse + ", " + _aktuelleBestellung[_aktuellerIndex].stadt;

        if (_aktuelleBestellung[_aktuellerIndex].geschmolzen) {
            htmlElementErstellen(div, "p", "bestellung").innerHTML = "Ich bin geschmolzen!";
            div.setAttribute("style", "background-color: #87BBA2");
        }

        if (_aktuellerIndex + 1 == _aktuelleBestellung.length) {
            let allesLoschenButton: HTMLButtonElement = <HTMLButtonElement>erstellButton(flexbox, "Lösch alles!", "weiter");
            allesLoschenButton.addEventListener("click", handlerLoeschen);
        }

        function handlerArtikelBearbeiten(): void {
            let urlSendenZu: string;
            let id: string = _aktuelleBestellung[_aktuellerIndex]._id + "";
            urlSendenZu = "https://sosegis2020.herokuapp.com" + "/bearbeiten?" + "id=" + id;
            fetch(urlSendenZu);
            buttonArtikel.remove();
            div.setAttribute("style", "background-color: #87BBA2");
            htmlElementErstellen(div, "p", "bestellung").innerHTML = "Ich bin geschmolzen!";
        }
    }

    function handlerLoeschen(): void {
        let urlSendenZu: string;
        urlSendenZu = "https://sosegis2020.herokuapp.com" + "/loeschen";
        fetch(urlSendenZu);

        for (let index: number = 0; index < (bestellung.length * 2); index++) {
            flexbox.firstChild?.remove();
        }
    }

    function htmlElementErstellen(_elternElement: HTMLElement, _artElement: string, classe: string): HTMLElement {
        let element: HTMLElement = document.createElement(_artElement);
        element.setAttribute("class", classe);
        _elternElement.appendChild(element);
        return element;
    }

    function erstellButton(_elternElement: HTMLElement, _text: string, _textClass: string): HTMLElement {
        let button: HTMLInputElement = <HTMLInputElement>document.createElement("button");
        _elternElement.appendChild(button);
        button.setAttribute("class", _textClass);
        button.innerHTML = _text;
        return button;
    }
}