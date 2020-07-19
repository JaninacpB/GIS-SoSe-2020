namespace Eisdiele {

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

        let radioWaffel: HTMLFormElement = <HTMLFormElement>document.getElementById("waffelFormular");
        let radioWert: string = radioWaffel["auswahlBehaelter"].value;
        if (radioWert == "true") {
            meinBecherIstWaffel = true;
        }
        else {
            meinBecherIstWaffel = false;
        }

        let flexWaffel: HTMLElement = <HTMLElement>document.getElementById("flexWaffel");

        let flexboxSchrittEins: HTMLElement = <HTMLElement>document.getElementById("flexboxschritt1");

        flexboxSchrittEins.remove();
        flexWaffel.remove();

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
            let flexKugel: HTMLElement = <HTMLElement>document.getElementById("flexKugel");
            let flexboxSchrittZwei: HTMLElement = <HTMLElement>document.getElementById("flexboxschritt2");
            flexboxSchrittZwei.remove();
            flexKugel.remove();

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

        let flexTopping: HTMLElement = <HTMLElement>document.getElementById("flexTopping");
        let flexboxSchrittDrei: HTMLElement = <HTMLElement>document.getElementById("flexboxschritt3");
        flexboxSchrittDrei.remove();
        flexTopping.remove();

        let flexBestellen: HTMLElement = <HTMLElement>document.createElement("div");
        let uerbschriftBestellen: HTMLElement = <HTMLElement>document.createElement("div");
        let flexboxSchrittVier: HTMLElement = <HTMLElement>document.createElement("div");
        erstellHeaderSchritt(flexBestellen, uerbschriftBestellen, flexboxSchrittVier, "Bestellen", "eins", 4, "Bestellen!");

        let formBestellen: HTMLElement = <HTMLElement>document.createElement("form");
        formBestellen.setAttribute("class", "versandt");
        flexboxSchrittVier.appendChild(formBestellen);

        fuellFrom("vorname", formBestellen);
        fuellFrom("nachname", formBestellen);
        fuellFrom("strasse", formBestellen);
        fuellFrom("stadt", formBestellen);

        let preisNumber: number = + localStorage.getItem("gesamtpreis")!;

        let h3Preis: HTMLElement = <HTMLElement>document.createElement("h3");
        h3Preis.innerHTML = "Alles zusammen macht das: <u>" + preisNumber.toFixed(2) + "€ </u>";
        formBestellen.appendChild(h3Preis);

        eisvorschauboxErstellen(flexboxSchrittVier);
        vorschauEis(meineBestellungEis, meineBestellungTopping, meinBecherIstWaffel);

        let buttonDritterSchritt: HTMLElement = erstellButton("vier", 0, formBestellen);
        // XXX Änderung 
        // buttonDritterSchritt.setAttribute("type", "submit");
        buttonDritterSchritt.setAttribute("type", "button");
        buttonDritterSchritt.setAttribute("style", "display: block");
        buttonDritterSchritt.setAttribute("action", "https://sosegis2020.herokuapp.com");

        buttonDritterSchritt.addEventListener("click", handlerAbschicken);
    }

    function handlerAbschicken(): void {

        let datenZumVerschicken: string = "";

        for (let index: number = 0; index < meineBestellungEis.length; index++) {
            datenZumVerschicken += "eiskugel" + "=" + meineBestellungEis[index].name + "&";
        }

        if (meineBestellungTopping) {
            for (let index: number = 0; index < meineBestellungTopping.length; index++) {
                datenZumVerschicken += "topping" + "=" + meineBestellungTopping[index].name + "&";
            }
        }

        let datenForm: FormData = new FormData(document.forms[0]);
        let urlSendenZu: string = "";
        let query: URLSearchParams = new URLSearchParams(<any>datenForm);
        let queryString: string = query.toString();

        let endgueltigerPreis: string = "preis=" + localStorage.getItem("gesamtpreis")! + "&";

        urlSendenZu = "https://sosegis2020.herokuapp.com" + "/eingabe?" + datenZumVerschicken + endgueltigerPreis + queryString;

        // XXX Bug finden
        console.log("https://sosegis2020.herokuapp.com" + "/eingabe?" + datenZumVerschicken + endgueltigerPreis + queryString);
        console.log("Deine Auswahl Eis: " + meineBestellungEis );
        console.log("Deine Auswahl Topping: " + meineBestellungTopping);
        console.log("Dein Preis: " + endgueltigerPreis);
        fetch(urlSendenZu);
    }

    function erstellHeaderSchritt(_flexArtikel: HTMLElement, _ueberschriftArtikel: HTMLElement, _flexboxSchritt: HTMLElement, _nameArtikel: string, _classUeberschrift: string, _aktuellerSchritt: number, _satzOben: string): void {

        _flexArtikel.setAttribute("id", "flex" + _nameArtikel);
        document.getElementById("grosseBox")?.appendChild(_flexArtikel);

        _ueberschriftArtikel.setAttribute("class", "schritt " + _classUeberschrift);
        _ueberschriftArtikel.setAttribute("id", _nameArtikel + "Ueberschrift");
        _ueberschriftArtikel.innerHTML = "Schritt " + _aktuellerSchritt + ": " + _satzOben;
        _flexArtikel.appendChild(_ueberschriftArtikel);

        _flexboxSchritt.setAttribute("id", "flexboxschritt" + _aktuellerSchritt);
        _flexboxSchritt.setAttribute("class", "flexbox");
        _flexArtikel.appendChild(_flexboxSchritt);

    }

    function artikelEinsortieren(_elternElement: HTMLElement, _artikelArt: EissortenUTopping[]): void {
        for (let index: number = 0; index <= _artikelArt.length; index++) {

            let divClassBox: HTMLElement = <HTMLElement>document.createElement("div");
            divClassBox.setAttribute("class", "artikelBox");
            divClassBox.setAttribute("id", "divClassBox");
            _elternElement.appendChild(divClassBox);

            if (index == _artikelArt.length) {
                eisvorschauboxErstellen(divClassBox);
                vorschauEis(meineBestellungEis, meineBestellungTopping, meinBecherIstWaffel);
            }
            else {

                let imgEis: HTMLElement = <HTMLElement>document.createElement("img");
                imgEis.setAttribute("class", "artikelBild");
                imgEis.setAttribute("src", _artikelArt[index].bild);
                imgEis.setAttribute("alt", _artikelArt[index].alt);
                divClassBox.appendChild(imgEis);

                let div: HTMLElement = <HTMLElement>document.createElement("div");
                divClassBox.appendChild(div);

                let h3Name: HTMLElement = <HTMLElement>document.createElement("h3");
                h3Name.innerHTML = _artikelArt[index].name;
                div.appendChild(h3Name);

                let h3Preis: HTMLElement = <HTMLElement>document.createElement("h3");
                h3Preis.innerHTML = _artikelArt[index].preis + "€";
                div.appendChild(h3Preis);

                let buttonEis: HTMLElement = <HTMLElement>document.createElement("button");
                buttonEis.setAttribute("class", "hinzufuegenEis");
                buttonEis.innerHTML = "+add";
                div.appendChild(buttonEis);

                buttonEis.addEventListener("click", eisHinzufuegen);

                function eisHinzufuegen(): void {

                    if (_artikelArt == eissorten) {

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
                    if (_artikelArt == toppingArten) {
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

                    vorschauEis(meineBestellungEis, meineBestellungTopping, meinBecherIstWaffel);
                }
            }
        }
    }

    function erstellButton(_schritt: string, _naechsterSchritt: number, _elternElement: HTMLElement): HTMLElement {
        let button: HTMLElement = <HTMLElement>document.createElement("button");
        button.setAttribute("class", "weiter");
        button.setAttribute("id", "buttonSchritt" + _schritt);
        if (_naechsterSchritt == 0) {
            button.innerHTML = "Bestellen!";
        }
        else {
            button.innerHTML = "Weiter zu Schritt " + _naechsterSchritt;
        }
        _elternElement.appendChild(button);
        return button;
    }

    function eisvorschauboxErstellen(_elternElement: HTMLElement): void {

        let divClassBox: HTMLElement = <HTMLElement>document.createElement("div");
        divClassBox.setAttribute("class", "artikelBox");
        divClassBox.setAttribute("id", "vorschau");
        _elternElement.appendChild(divClassBox);

        let div: HTMLElement = <HTMLElement>document.createElement("div");
        div.setAttribute("class", "eisVorschau");
        div.setAttribute("id", "eisVorschauKugeln");
        divClassBox.appendChild(div);

        let h3Vorschau: HTMLElement = <HTMLElement>document.createElement("h3");
        h3Vorschau.innerHTML = "Vorschau";
        divClassBox.appendChild(h3Vorschau);
    }

    function fuellFrom(_forName: string, _elternElement: HTMLElement): void {
        let label: HTMLElement = <HTMLElement>document.createElement("label");
        label.setAttribute("for", _forName);
        label.innerHTML = _forName + ":";
        _elternElement.appendChild(label);

        let input: HTMLInputElement = <HTMLInputElement>document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name", _forName);
        input.required = true;
        _elternElement.appendChild(input);
    }

    function vorschauEis(_eis: EissortenUTopping[], _topping: EissortenUTopping[], _waffelJa: boolean): void {

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

        if (_waffelJa) {
            imgBehaehlter.setAttribute("src", "https://janinacpb.github.io/GIS-SoSe-2020/Endabgabe/Archiv/waffel.png");
            imgBehaehlter.setAttribute("class", "vWaffel vorschauBild");
            div.appendChild(imgBehaehlter);

            if (_eis) {
                for (let index: number = 0; index < _eis.length; index++) {
                    fuegEisHinzu(_eis[index], index, div, true);
                }
            }

            if (_topping) {
                for (let index: number = 0; index < _topping.length; index++) {
                    let imgEisTopping: HTMLElement = <HTMLElement>document.createElement("img");
                    imgEisTopping.setAttribute("class", "vKugel" + _eis.length + " vorschauBild");
                    imgEisTopping.setAttribute("src", _topping[index].bildComic);
                    imgEisTopping.setAttribute("alt", _topping[index].alt);
                    div.appendChild(imgEisTopping);

                    fuegToppingHinzu(_topping[index], _eis, div, true);
                }
            }
        }

        else {
            imgBehaehlter.setAttribute("src", "https://janinacpb.github.io/GIS-SoSe-2020/Endabgabe/Archiv/becher.png");
            imgBehaehlter.setAttribute("class", "vBecher vorschauBild");
            div.appendChild(imgBehaehlter);

            if (_eis) {
                for (let index: number = 0; index < _eis.length; index++) {
                    fuegEisHinzu(_eis[index], index, div, false);
                }
            }
            if (_topping) {
                for (let index: number = 0; index < _topping.length; index++) {
                    fuegToppingHinzu(_topping[index], _eis, div, false);
                }
            }

        }

        document.getElementById("eisVorschauKugeln")?.appendChild(imgBehaehlter);
    }

    function fuegToppingHinzu(_top: EissortenUTopping, _eis: EissortenUTopping[], _elternElement: HTMLElement, _istWaffel: boolean): void {
        let imgEisTopping: HTMLElement = <HTMLElement>document.createElement("img");
        if (_istWaffel) {
            imgEisTopping.setAttribute("class", "vKugel" + _eis.length + " vorschauBild");
        }
        else {
            imgEisTopping.setAttribute("class", "vKugelBecher" + _eis.length + " vorschauBild");
        }
        imgEisTopping.setAttribute("src", _top.bildComic);
        imgEisTopping.setAttribute("alt", _top.alt);
        _elternElement.appendChild(imgEisTopping);
    }

    function fuegEisHinzu(_eis: EissortenUTopping, _index: number, _elternElement: HTMLElement, _istWaffle: boolean): void {
        let zaehlerAngepasst: number = _index + 1;
        let imgEisKugel: HTMLElement = <HTMLElement>document.createElement("img");
        if (_istWaffle) {
            imgEisKugel.setAttribute("class", "vKugel" + zaehlerAngepasst + " vorschauBild");
        }
        else {
            imgEisKugel.setAttribute("class", "vKugelBecher" + zaehlerAngepasst + " vorschauBild");
        }
        imgEisKugel.setAttribute("src", _eis.bildComic);
        imgEisKugel.setAttribute("alt", _eis.alt);
        _elternElement.appendChild(imgEisKugel);
    }
}