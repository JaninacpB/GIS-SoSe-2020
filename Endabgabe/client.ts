namespace eisdiele {

    let eissorten: EissortenUTopping[];
    let waffelArten: Beahelter[];
    let toppingArten: EissortenUTopping[];

    let meineBestellungEis: EissortenUTopping[];
    let meineBestellungTopping: EissortenUTopping[];
    let meinBecherIstWaffel: boolean;

    getArtikel();

    async function getArtikel(): Promise<void> {
        let artikelBekommen: Response = await fetch("eissorten.json");
        eissorten = await artikelBekommen.json();

        let waffelbekommen: Response = await fetch("waffelsorten.json");
        waffelArten = await waffelbekommen.json();

        let toppingbekommen: Response = await fetch("topping.json");
        toppingArten = await toppingbekommen.json();

        erstellSchrittEins();
    }

    function erstellSchrittEins(): void {

        let flexWaffel: HTMLElement = <HTMLElement>document.createElement("div");
        let uerbschriftWaffel: HTMLElement = <HTMLElement>document.createElement("div");
        let flexboxSchrittEins: HTMLElement = <HTMLElement>document.createElement("div");
        erstellHeaderSchritt(flexWaffel, uerbschriftWaffel, flexboxSchrittEins, "Waffel", "drei", 1, "Wähle deine Waffel!");

        let form: HTMLFormElement = <HTMLFormElement>document.createElement("form");
        form.setAttribute("class", "auswahlFormularWaffel");
        form.setAttribute("id", "waffelFormular");
        flexboxSchrittEins.appendChild(form);

        for (let index: number = 0; index < waffelArten.length; index++) {

            let divClassBox: HTMLElement = <HTMLElement>document.createElement("div");
            divClassBox.setAttribute("class", "artikelBox");
            form.appendChild(divClassBox);

            let imgWaffel: HTMLElement = <HTMLElement>document.createElement("img");
            imgWaffel.setAttribute("class", "artikelBild");
            imgWaffel.setAttribute("src", waffelArten[index].bild);
            imgWaffel.setAttribute("alt", waffelArten[index].alt);
            divClassBox.appendChild(imgWaffel);

            let divRadioWaffel: HTMLElement = <HTMLElement>document.createElement("div");
            divRadioWaffel.setAttribute("class", "radiowaffel");
            divClassBox.appendChild(divRadioWaffel);

            let label: HTMLElement = <HTMLElement>document.createElement("label");
            label.setAttribute("for", waffelArten[index].for);
            divRadioWaffel.appendChild(label);

            let h3Waffel: HTMLElement = <HTMLElement>document.createElement("h3");
            h3Waffel.innerHTML = waffelArten[index].name;
            label.appendChild(h3Waffel);

            let input: HTMLElement = <HTMLElement>document.createElement("input");
            input.setAttribute("type", "radio");
            input.setAttribute("name", "auswahlBehaelter");
            input.setAttribute("value", waffelArten[index].value);
            input.setAttribute("id", waffelArten[index].id);
            if (index + 2 == waffelArten.length) {
                input.setAttribute("checked", "checked");
            }

            divRadioWaffel.appendChild(input);

        }

        let buttonErsterSchritt: HTMLElement = erstellButton("eins", 2, flexboxSchrittEins);
        buttonErsterSchritt.setAttribute("type", "submit");
        flexboxSchrittEins.appendChild(buttonErsterSchritt);

        buttonErsterSchritt.addEventListener("click", handlerLoeschEinsMachZwei);

    }

    function handlerLoeschEinsMachZwei(): void {

        // Daten merken

        let radioWaffel: HTMLFormElement = <HTMLFormElement>document.getElementById("waffelFormular");
        let radioWert: string = radioWaffel["auswahlBehaelter"].value;
        if (radioWert == "true") {
            meinBecherIstWaffel = true;
        }
        else {
            meinBecherIstWaffel = false;
        }
        //Aktuelles Menü lösche
        // let uerbschriftWaffel: HTMLElement = <HTMLElement> document.getElementById("waffelUeberschrift");
        let flexWaffel: HTMLElement = <HTMLElement>document.getElementById("flexWaffel");

        let flexboxSchrittEins: HTMLElement = <HTMLElement>document.getElementById("flexboxschritt1");

        flexboxSchrittEins.remove();
        flexWaffel.remove();

        //neues erstellen
        let flexKugel: HTMLElement = <HTMLElement>document.createElement("div");
        let uerbschriftKugel: HTMLElement = <HTMLElement>document.createElement("div");
        let flexboxSchrittZwei: HTMLElement = <HTMLElement>document.createElement("div");
        erstellHeaderSchritt(flexKugel, uerbschriftKugel, flexboxSchrittZwei, "Kugel", "eins", 2, "Wähle deine Eissorte!");

        artikelEinsortieren(flexboxSchrittZwei, eissorten);

        let buttonZweiterSchritt: HTMLElement = erstellButton("zwei", 3, flexboxSchrittZwei);
        buttonZweiterSchritt.addEventListener("click", handlerLoeschZweiMachDrei);

    }

    function handlerLoeschZweiMachDrei(): void {

        if (meineBestellungEis == undefined) {
            alert("Wähle eine Eissorte aus!");
        }

        else {

        // Daten merken

        //Aktuelles Menü lösche
        let flexKugel: HTMLElement = <HTMLElement>document.getElementById("flexKugel");
        let flexboxSchrittZwei: HTMLElement = <HTMLElement>document.getElementById("flexboxschritt2");
        flexboxSchrittZwei.remove();
        flexKugel.remove();

        //neues erstellen
        let flexTopping: HTMLElement = <HTMLElement>document.createElement("div");
        let uerbschriftTopping: HTMLElement = <HTMLElement>document.createElement("div");
        let flexboxSchrittDrei: HTMLElement = <HTMLElement>document.createElement("div");
        erstellHeaderSchritt(flexTopping, uerbschriftTopping, flexboxSchrittDrei, "Topping", "zwei", 3, "Wähle dein Topping!");

        artikelEinsortieren(flexboxSchrittDrei, toppingArten);
        let buttonDritterSchritt: HTMLElement = erstellButton("zweiter", 4, flexboxSchrittDrei);

        buttonDritterSchritt.addEventListener("click", handlerLoeschDreiMachVier);
        }
    }

    function handlerLoeschDreiMachVier(): void {

        //Remove
        let flexTopping: HTMLElement = <HTMLElement>document.getElementById("flexTopping");
        let flexboxSchrittDrei: HTMLElement = <HTMLElement>document.getElementById("flexboxschritt3");
        flexboxSchrittDrei.remove();
        flexTopping.remove();

        // Neu hinzufügen
        let flexBestellen: HTMLElement = <HTMLElement>document.createElement("div");
        let uerbschriftBestellen: HTMLElement = <HTMLElement>document.createElement("div");
        let flexboxSchrittVier: HTMLElement = <HTMLElement>document.createElement("div");
        erstellHeaderSchritt(flexBestellen, uerbschriftBestellen, flexboxSchrittVier, "Bestellen", "eins", 4, "Bestellen!");

        let formBestellen: HTMLElement = <HTMLElement>document.createElement("form");
        formBestellen.setAttribute("class", "versandt");
        flexboxSchrittVier.appendChild(formBestellen);

        fuellFrom("Vorname", formBestellen);
        fuellFrom("Nachname", formBestellen);
        fuellFrom("Strasse", formBestellen);
        fuellFrom("Stadt", formBestellen);

        let h3Form: HTMLElement = <HTMLElement>document.createElement("h3");
        h3Form.innerHTML = "Weitere Anmerkungen";
        formBestellen.appendChild(h3Form);

       /*  let textArea: HTMLTextAreaElement = <HTMLTextAreaElement> document.createElement("textarea");
        textArea.setAttribute("name", "anmerkung");
        textArea.setAttribute("rows", "10");
        textArea.setAttribute("cols", "60");
        textArea.setAttribute("spellspeck", "true");
        formBestellen.appendChild(textArea); */

        let preisNumber: number = + localStorage.getItem("gesamtpreis")!;

        let h3Preis: HTMLElement = <HTMLElement> document.createElement("h3");
        h3Preis.innerHTML = "Alles zusammen macht das: <u>" + preisNumber.toFixed(2) + "€ </u>";
        formBestellen.appendChild(h3Preis);
 
        eisvorschauboxErstellen(flexboxSchrittVier);
        vorschauEis(meineBestellungEis, meineBestellungTopping, meinBecherIstWaffel);

        let buttonDritterSchritt: HTMLElement = erstellButton("vier", 0, formBestellen);
        buttonDritterSchritt.setAttribute("type", "submit");
        buttonDritterSchritt.setAttribute("style", "display: block");
        buttonDritterSchritt.setAttribute("action", "https://sosegis2020.herokuapp.com");

        buttonDritterSchritt.addEventListener("click", handlerAbschicken);

    }

    // Ablauf vorbei, Funktionen

    async function handlerAbschicken(): Promise <void> {

        let datenZumVerschicken: string = "";

        for (let index: number = 0; index < meineBestellungEis.length; index++) {
            datenZumVerschicken += "eiskugel" + index + "=" + meineBestellungEis[index].name + "&"; 
        }
        
        let datenForm: FormData = new FormData(document.forms[0]);
        let urlSendenZu: string = "";
        let query: URLSearchParams = new URLSearchParams(<any>datenForm);
        let queryString: string = query.toString();

        let endgueltigerPreis: string = localStorage.getItem("gesamtPreis") + "";

        urlSendenZu = "https://sosegis2020.herokuapp.com" + "/eingabe" + "?" + datenZumVerschicken + endgueltigerPreis + "?" + queryString;
        console.log("https://sosegis2020.herokuapp.com" + "/eingabe" + "?" + datenZumVerschicken + endgueltigerPreis + "?" + queryString);
        await fetch(urlSendenZu);

    }

    function erstellHeaderSchritt(flexArtikel: HTMLElement, ueberschriftArtikel: HTMLElement, flexboxSchritt: HTMLElement, nameArtikel: string, classUeberschrift: string, aktuellerSchritt: number, satzOben: string): void {
        
        flexArtikel.setAttribute("id", "flex" + nameArtikel);
        document.getElementById("grosseBox")?.appendChild(flexArtikel);

        ueberschriftArtikel.setAttribute("class", "schritt " + classUeberschrift);
        ueberschriftArtikel.setAttribute("id", nameArtikel + "Ueberschrift");
        ueberschriftArtikel.innerHTML = "Schritt " + aktuellerSchritt + ": " + satzOben;
        flexArtikel.appendChild(ueberschriftArtikel);

        flexboxSchritt.setAttribute("id", "flexboxschritt" + aktuellerSchritt);
        flexboxSchritt.setAttribute("class", "flexbox");
        flexArtikel.appendChild(flexboxSchritt);

    }

    function artikelEinsortieren(elternElement: HTMLElement, artikelArt: EissortenUTopping[]): void {
        for (let index: number = 0; index <= artikelArt.length; index++) {

            let divClassBox: HTMLElement = <HTMLElement>document.createElement("div");
            divClassBox.setAttribute("class", "artikelBox");
            divClassBox.setAttribute("id", "divClassBox");
            elternElement.appendChild(divClassBox);

            // Letzter Durchgang -> Vorschau
            if (index == artikelArt.length) {
                eisvorschauboxErstellen(divClassBox);
                vorschauEis(meineBestellungEis, meineBestellungTopping, meinBecherIstWaffel);
            }
            else {

                let imgEis: HTMLElement = <HTMLElement>document.createElement("img");
                imgEis.setAttribute("class", "artikelBild");
                imgEis.setAttribute("src", artikelArt[index].bild);
                imgEis.setAttribute("alt", artikelArt[index].alt);
                divClassBox.appendChild(imgEis);

                let div: HTMLElement = <HTMLElement>document.createElement("div");
                divClassBox.appendChild(div);

                let h3Name: HTMLElement = <HTMLElement>document.createElement("h3");
                h3Name.innerHTML = artikelArt[index].name;
                div.appendChild(h3Name);

                let h3Preis: HTMLElement = <HTMLElement>document.createElement("h3");
                h3Preis.innerHTML = artikelArt[index].preis + "€";
                div.appendChild(h3Preis);

                let buttonEis: HTMLElement = <HTMLElement>document.createElement("button");
                buttonEis.setAttribute("class", "hinzufuegenEis");
                buttonEis.innerHTML = "+add";
                div.appendChild(buttonEis);

                buttonEis.addEventListener("click", eisHinzufuegen);

                function eisHinzufuegen(): void {

                    //Button Abfrage Eiskugeln
                    if (artikelArt == eissorten) {

                        if (!meineBestellungEis) {
                            meineBestellungEis = [eissorten[index]];
                        }
                        else {
                            if (meineBestellungEis.length > 3) {
                                alert("Tut uns leid, du kannst nicht mehr als vier Kugeln kaufen. Wir schützen dich nur vor dir selbst.");
                            }
                            else {
                                meineBestellungEis.push(eissorten[index]);
                            }
                        }
                    }
                    if (artikelArt == toppingArten) {
                        {
                            if (!meineBestellungTopping) {
                                meineBestellungTopping = [toppingArten[index]];
                            }
                            else {
                                let schonimWagen: boolean = false;
                                for (let indexX: number = 0; indexX < meineBestellungTopping.length; indexX++) {
                                    if (meineBestellungTopping[indexX] == toppingArten[index]) {
                                        alert("Das hast du bereits ausgewählt!");
                                        schonimWagen = true;
                                        indexX += meineBestellungTopping.length;
                                    }
                                }
                                if (!schonimWagen) {
                                    meineBestellungTopping.push(toppingArten[index]);
                                }
                            }
                        }
                    }

                    let gesamtPreis: number = 0;
                    if (meineBestellungEis) {
                        for (let index1: number = 0; index1 < meineBestellungEis.length; index1++) {
                            gesamtPreis += meineBestellungEis[index1].preis;
                        }
                    }
                    if (meineBestellungTopping) {
                        for (let index1: number = 0; index1 < meineBestellungTopping.length; index1++) {
                            gesamtPreis += meineBestellungTopping[index1].preis;
                        }
                    }
                    let gesamtPreisString: string = gesamtPreis.toString();
                    localStorage.setItem("gesamtpreis", gesamtPreisString);

                    //VorschauBild generieren (aktualisieren)
                    vorschauEis(meineBestellungEis, meineBestellungTopping, meinBecherIstWaffel);
                }
            }
        }
    }

    function erstellButton(schritt: string, naechsterSchritt: number, elternElement: HTMLElement): HTMLElement {
        let button: HTMLElement = <HTMLElement>document.createElement("button");
        button.setAttribute("class", "weiter");
        button.setAttribute("id", "buttonSchritt" + schritt);
        if (naechsterSchritt == 0) {
            button.innerHTML = "Bestellen!";
        }
        else {
            button.innerHTML = "Weiter zu Schritt " + naechsterSchritt;
        }
        elternElement.appendChild(button);
        return button;
    }

    function eisvorschauboxErstellen(elternElement: HTMLElement): void {

        let divClassBox: HTMLElement = <HTMLElement>document.createElement("div");
        divClassBox.setAttribute("class", "artikelBox");
        divClassBox.setAttribute("id", "vorschau");
        elternElement.appendChild(divClassBox);

        let div: HTMLElement = <HTMLElement>document.createElement("div");
        div.setAttribute("class", "eisVorschau");
        div.setAttribute("id", "eisVorschauKugeln");
        divClassBox.appendChild(div);

        let h3Vorschau: HTMLElement = <HTMLElement>document.createElement("h3");
        h3Vorschau.innerHTML = "Vorschau";
        divClassBox.appendChild(h3Vorschau);
    }

    function fuellFrom(forName: string, elternElement: HTMLElement): void {
        let label: HTMLElement = <HTMLElement>document.createElement("label");
        label.setAttribute("for", forName);
        label.innerHTML = forName + ":";
        elternElement.appendChild(label);

        let input: HTMLInputElement = <HTMLInputElement>document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name", forName);
        input.required = true;
        elternElement.appendChild(input);
    }

    function vorschauEis(eis: EissortenUTopping[], topping: EissortenUTopping[], waffelJa: boolean): void {

        //Löschen für neubau später
        if (document.getElementById("eisVorschauKugeln")?.hasChildNodes) {
            let loeschen: HTMLElement = <HTMLElement>document.getElementById("eisVorschauKugeln");
            for (let anzahlKugel: number = 0; anzahlKugel <= eissorten.length; anzahlKugel++) {
                loeschen.firstChild?.remove();
            }
            for (let anzahlKugel: number = 0; anzahlKugel < toppingArten.length; anzahlKugel++) {
                loeschen.firstChild?.remove();
            }
        }

        let imgBehaehlter: HTMLElement = <HTMLElement>document.createElement("img");
        imgBehaehlter.setAttribute("id", "exestiertWaffel");

        let div: HTMLElement = <HTMLElement>document.getElementById("eisVorschauKugeln");

        if (waffelJa) {
            imgBehaehlter.setAttribute("src", "https://janinacpb.github.io/GIS-SoSe-2020/Endabgabe/Archiv/waffel.png");
            imgBehaehlter.setAttribute("class", "vWaffel vorschauBild");
            div.appendChild(imgBehaehlter);

            if (eis) {
                for (let index: number = 0; index < eis.length; index++) {
                    fuegEisHinzu(eis[index], index, div, true);
                }
            }

            if (topping) {
                for (let index: number = 0; index < topping.length; index++) {
                    let imgEisTopping: HTMLElement = <HTMLElement>document.createElement("img");
                    imgEisTopping.setAttribute("class", "vKugel" + eis.length + " vorschauBild");
                    imgEisTopping.setAttribute("src", topping[index].bildComic);
                    imgEisTopping.setAttribute("alt", topping[index].alt);
                    div.appendChild(imgEisTopping);

                    fuegToppingHinzu(topping[index], eis, div, true);
                }
            }
        }

        else {
            imgBehaehlter.setAttribute("src", "https://janinacpb.github.io/GIS-SoSe-2020/Endabgabe/Archiv/becher.png");
            imgBehaehlter.setAttribute("class", "vBecher vorschauBild");
            div.appendChild(imgBehaehlter);

            if (eis) {
                for (let index: number = 0; index < eis.length; index++) {
                    fuegEisHinzu(eis[index], index, div, false);
                }
            }
            if (topping) {
                for (let index: number = 0; index < topping.length; index++) {
                    fuegToppingHinzu(topping[index], eis, div, false);
                }
            }

        }

        document.getElementById("eisVorschauKugeln")?.appendChild(imgBehaehlter);
    }

    function fuegToppingHinzu(top: EissortenUTopping, eis: EissortenUTopping[], elternElement: HTMLElement, istWaffel: boolean): void {
        let imgEisTopping: HTMLElement = <HTMLElement>document.createElement("img");
        if (istWaffel) {
            imgEisTopping.setAttribute("class", "vKugel" + eis.length + " vorschauBild");
        }
        else {
            imgEisTopping.setAttribute("class", "vKugelBecher" + eis.length + " vorschauBild");
        }
        imgEisTopping.setAttribute("src", top.bildComic);
        imgEisTopping.setAttribute("alt", top.alt);
        elternElement.appendChild(imgEisTopping);
    }

    function fuegEisHinzu(eis: EissortenUTopping, index: number, elternElement: HTMLElement, istWaffle: boolean): void {
        let zaehlerAngepasst: number = index + 1;
        let imgEisKugel: HTMLElement = <HTMLElement>document.createElement("img");
        if (istWaffle) {
            imgEisKugel.setAttribute("class", "vKugel" + zaehlerAngepasst + " vorschauBild");
        }
        else {
            imgEisKugel.setAttribute("class", "vKugelBecher" + zaehlerAngepasst + " vorschauBild");
        }
        imgEisKugel.setAttribute("src", eis.bildComic);
        imgEisKugel.setAttribute("alt", eis.alt);
        elternElement.appendChild(imgEisKugel);
    }
}