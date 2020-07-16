namespace eisdiele {
    let flexbox: HTMLElement = <HTMLElement> document.getElementById("flexbox");
    /* htmlElementErstellen( flexbox, "div", ""); */
    let urlSendenZu: string;
    let bestellung: Bestellung[];
    urlSendenZu = "https://sosegis2020.herokuapp.com" + "/lesen";
    datenbankAuslesen();

    async function datenbankAuslesen(): Promise <void> {
        let response: Response = await fetch(urlSendenZu);
        bestellung = await response.json();
        
        for ( let index: number = 0; index < bestellung.length; index++) {
        erstellBestellungHtml(index, bestellung);
        }
    }

    function erstellBestellungHtml(aktuellerIndex: number, aktuelleBestellung: Bestellung[]): void {
        let div: HTMLElement = htmlElementErstellen(flexbox, "div", "bestellungBox");

        erstellButton( div, "Erledigt", "bearbeitenButton");
        htmlElementErstellen(div, "p", "bestellung").innerHTML =  "Artikel " + (aktuellerIndex + 1);
        htmlElementErstellen(div, "p", "bestellung").innerHTML =  "Eissorten: " + aktuelleBestellung[aktuellerIndex].eiskugel;
        if (aktuelleBestellung[aktuellerIndex].topping) {
            htmlElementErstellen(div, "p", "bestellung").innerHTML =  "Topping: " + aktuelleBestellung[aktuellerIndex].topping;
            }
        htmlElementErstellen(div, "p", "bestellung").innerHTML = "Preis: " + aktuelleBestellung[aktuellerIndex].preis + "€";
        htmlElementErstellen(div, "p", "bestellung").innerHTML = "Besteller: " + aktuelleBestellung[aktuellerIndex].nachname + ", " + aktuelleBestellung[aktuellerIndex].vorname;
        htmlElementErstellen(div, "p", "bestellung").innerHTML = "Adresse: " + aktuelleBestellung[aktuellerIndex].strasse + ", " + aktuelleBestellung[aktuellerIndex].stadt;

        if (aktuellerIndex + 1 == aktuelleBestellung.length) {
            let allesLoschenButton: HTMLButtonElement = <HTMLButtonElement> erstellButton( flexbox, "Lösch alles!", "weiter");
            allesLoschenButton.addEventListener("click", handlerLoeschen);
        }
    }

    function handlerLoeschen(): void {
        let urlSendenZu: string;
        urlSendenZu = "https://sosegis2020.herokuapp.com" + "/loeschen";
        fetch(urlSendenZu);

        for ( let index: number = 0; index < (bestellung.length * 2); index++) {
            flexbox.firstChild?.remove();
        }
    }

    function htmlElementErstellen ( elternElement: HTMLElement, artElement: string, classe: string): HTMLElement {
        let element: HTMLElement = document.createElement(artElement);
        element.setAttribute("class", classe);
        elternElement.appendChild(element);
        return element;
    }

    function erstellButton( elternElement: HTMLElement, text: string, textClass: string): HTMLElement {
        let button: HTMLInputElement = <HTMLInputElement> document.createElement("button");
        elternElement.appendChild(button);
        button.setAttribute("class", textClass);
        button.innerHTML = text;
        return button;
    }
}