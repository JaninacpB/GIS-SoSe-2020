"use strict";
var eisdiele;
(function (eisdiele) {
    let eissorten;
    let waffelArten;
    let toppingArten;
    let meineBestellungEis;
    let meineBestellungTopping;
    let meinBecherIstWaffel;
    getArtikel();
    async function getArtikel() {
        let artikelBekommen = await fetch("eissorten.json");
        eissorten = await artikelBekommen.json();
        let waffelbekommen = await fetch("waffelsorten.json");
        waffelArten = await waffelbekommen.json();
        let toppingbekommen = await fetch("topping.json");
        toppingArten = await toppingbekommen.json();
        erstellSchrittEins();
    }
    function erstellSchrittEins() {
        let flexWaffel = document.createElement("div");
        let uerbschriftWaffel = document.createElement("div");
        let flexboxSchrittEins = document.createElement("div");
        erstellHeaderSchritt(flexWaffel, uerbschriftWaffel, flexboxSchrittEins, "Waffel", "drei", 1, "Wähle deine Waffel!");
        let form = document.createElement("form");
        form.setAttribute("class", "auswahlFormularWaffel");
        form.setAttribute("id", "waffelFormular");
        flexboxSchrittEins.appendChild(form);
        for (let index = 0; index < waffelArten.length; index++) {
            let divClassBox = document.createElement("div");
            divClassBox.setAttribute("class", "artikelBox");
            form.appendChild(divClassBox);
            let imgWaffel = document.createElement("img");
            imgWaffel.setAttribute("class", "artikelBild");
            imgWaffel.setAttribute("src", waffelArten[index].bild);
            imgWaffel.setAttribute("alt", waffelArten[index].alt);
            divClassBox.appendChild(imgWaffel);
            let divRadioWaffel = document.createElement("div");
            divRadioWaffel.setAttribute("class", "radiowaffel");
            divClassBox.appendChild(divRadioWaffel);
            let label = document.createElement("label");
            label.setAttribute("for", waffelArten[index].for);
            divRadioWaffel.appendChild(label);
            let h3Waffel = document.createElement("h3");
            h3Waffel.innerHTML = waffelArten[index].name;
            label.appendChild(h3Waffel);
            let input = document.createElement("input");
            input.setAttribute("type", "radio");
            input.setAttribute("name", "auswahlBehaelter");
            input.setAttribute("value", waffelArten[index].value);
            input.setAttribute("id", waffelArten[index].id);
            if (index + 2 == waffelArten.length) {
                input.setAttribute("checked", "checked");
            }
            divRadioWaffel.appendChild(input);
        }
        let buttonErsterSchritt = erstellButton("eins", 2, flexboxSchrittEins);
        buttonErsterSchritt.setAttribute("type", "submit");
        flexboxSchrittEins.appendChild(buttonErsterSchritt);
        buttonErsterSchritt.addEventListener("click", handlerLoeschEinsMachZwei);
    }
    function handlerLoeschEinsMachZwei() {
        // Daten merken
        let radioWaffel = document.getElementById("waffelFormular");
        let radioWert = radioWaffel["auswahlBehaelter"].value;
        if (radioWert == "true") {
            meinBecherIstWaffel = true;
        }
        else {
            meinBecherIstWaffel = false;
        }
        // localStorage.setItem("behaelterIstWaffel", radioWert);
        //Aktuelles Menü lösche
        // let uerbschriftWaffel: HTMLElement = <HTMLElement> document.getElementById("waffelUeberschrift");
        let flexWaffel = document.getElementById("flexWaffel");
        let flexboxSchrittEins = document.getElementById("flexboxschritt1");
        flexboxSchrittEins.remove();
        flexWaffel.remove();
        //neues erstellen
        let flexKugel = document.createElement("div");
        let uerbschriftKugel = document.createElement("div");
        let flexboxSchrittZwei = document.createElement("div");
        erstellHeaderSchritt(flexKugel, uerbschriftKugel, flexboxSchrittZwei, "Kugel", "eins", 2, "Wähle deine Eissorte!");
        artikelEinsortieren(flexboxSchrittZwei, eissorten);
        let buttonZweiterSchritt = erstellButton("zwei", 3, flexboxSchrittZwei);
        buttonZweiterSchritt.addEventListener("click", handlerLoeschZweiMachDrei);
    }
    function handlerLoeschZweiMachDrei() {
        // Daten merken
        //Aktuelles Menü lösche
        let flexKugel = document.getElementById("flexKugel");
        let flexboxSchrittZwei = document.getElementById("flexboxschritt2");
        flexboxSchrittZwei.remove();
        flexKugel.remove();
        //neues erstellen
        let flexTopping = document.createElement("div");
        let uerbschriftTopping = document.createElement("div");
        let flexboxSchrittDrei = document.createElement("div");
        erstellHeaderSchritt(flexTopping, uerbschriftTopping, flexboxSchrittDrei, "Topping", "zwei", 3, "Wähle dein Topping!");
        artikelEinsortieren(flexboxSchrittDrei, toppingArten);
        let buttonDritterSchritt = erstellButton("zweiter", 4, flexboxSchrittDrei);
        buttonDritterSchritt.addEventListener("click", handlerLoeschDreiMachVier);
    }
    function handlerLoeschDreiMachVier() {
        //Remove
        let flexTopping = document.getElementById("flexTopping");
        let flexboxSchrittDrei = document.getElementById("flexboxschritt3");
        flexboxSchrittDrei.remove();
        flexTopping.remove();
        // Neu hinzufügen
        let flexBestellen = document.createElement("div");
        let uerbschriftBestellen = document.createElement("div");
        let flexboxSchrittVier = document.createElement("div");
        erstellHeaderSchritt(flexBestellen, uerbschriftBestellen, flexboxSchrittVier, "Bestellen", "eins", 4, "Bestellen!");
        let formBestellen = document.createElement("form");
        formBestellen.setAttribute("class", "versandt");
        flexboxSchrittVier.appendChild(formBestellen);
        fuellFrom("Vorname", formBestellen);
        fuellFrom("Nachname", formBestellen);
        fuellFrom("Strasse", formBestellen);
        fuellFrom("Stadt", formBestellen);
        let h3Form = document.createElement("h3");
        h3Form.innerHTML = "Weitere Anmerkungen";
        formBestellen.appendChild(h3Form);
        let textArea = document.createElement("textarea");
        textArea.setAttribute("rows", "10");
        textArea.setAttribute("cols", "60");
        textArea.setAttribute("spellspeck", "true");
        formBestellen.appendChild(textArea);
        eisvorschauboxErstellen(flexboxSchrittVier);
        let buttonDritterSchritt = erstellButton("vier", 0, flexboxSchrittVier);
    }
    // Ablauf vorbei, Funktionen
    function erstellHeaderSchritt(flexArtikel, ueberschriftArtikel, flexboxSchritt, nameArtikel, classUeberschrift, aktuellerSchritt, satzOben) {
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
    function artikelEinsortieren(elternElement, artikelArt) {
        for (let index = 0; index <= artikelArt.length; index++) {
            let divClassBox = document.createElement("div");
            divClassBox.setAttribute("class", "artikelBox");
            elternElement.appendChild(divClassBox);
            // Letzter Durchgang -> Vorschau
            if (index == artikelArt.length) {
                eisvorschauboxErstellen(divClassBox);
                /*  let div: HTMLElement = <HTMLElement>document.createElement("div");
                 div.setAttribute("class", "eisVorschau");
                 div.setAttribute("id", "eisVorschauKugeln");
                 divClassBox.appendChild(div);
 
                 let h3Vorschau: HTMLElement = <HTMLElement>document.createElement("h3");
                 h3Vorschau.innerHTML = "Vorschau";
                 divClassBox.appendChild(h3Vorschau); */
                // vorschauEis(radioWert);
            }
            else {
                let imgEis = document.createElement("img");
                imgEis.setAttribute("class", "artikelBild");
                imgEis.setAttribute("src", artikelArt[index].bild);
                imgEis.setAttribute("alt", artikelArt[index].alt);
                divClassBox.appendChild(imgEis);
                let div = document.createElement("div");
                divClassBox.appendChild(div);
                let h3Name = document.createElement("h3");
                h3Name.innerHTML = artikelArt[index].name;
                div.appendChild(h3Name);
                let h3Preis = document.createElement("h3");
                h3Preis.innerHTML = artikelArt[index].preis + "€";
                div.appendChild(h3Preis);
                let buttonEis = document.createElement("button");
                buttonEis.setAttribute("class", "hinzufuegenEis");
                buttonEis.innerHTML = "+add";
                div.appendChild(buttonEis);
                buttonEis.addEventListener("click", eisHinzufuegen);
                function eisHinzufuegen() {
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
                                let schonimWagen = false;
                                for (let indexX = 0; indexX < meineBestellungTopping.length; index++) {
                                    if (meineBestellungTopping[indexX] == toppingArten[index]) {
                                        alert("Das hast du bereits ausgewählt!");
                                        schonimWagen = true;
                                        indexX += meineBestellungTopping.length;
                                        console.log("hey");
                                    }
                                }
                                if (!schonimWagen) {
                                    meineBestellungTopping.push(toppingArten[index]);
                                }
                            }
                        }
                    }
                    let gesamtPreis = 0;
                    if (meineBestellungEis) {
                        for (let index = 0; index < meineBestellungEis.length; index++) {
                            gesamtPreis += meineBestellungEis[index].preis;
                        }
                    }
                    if (meineBestellungTopping) {
                        for (let index = 0; index < meineBestellungTopping.length; index++) {
                            gesamtPreis += meineBestellungTopping[index].preis;
                        }
                    }
                    let gesamtPreisString = gesamtPreis.toString();
                    localStorage.setItem("gesamtpreis", gesamtPreisString);
                    console.log(meineBestellungEis);
                    console.log(meineBestellungTopping);
                }
            }
        }
    }
    function erstellButton(schritt, naechsterSchritt, elternElement) {
        let button = document.createElement("button");
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
    function eisvorschauboxErstellen(elternElement) {
        let divClassBox = document.createElement("div");
        divClassBox.setAttribute("class", "artikelBox");
        elternElement.appendChild(divClassBox);
        let div = document.createElement("div");
        div.setAttribute("class", "eisVorschau");
        div.setAttribute("id", "eisVorschauKugeln");
        divClassBox.appendChild(div);
        let h3Vorschau = document.createElement("h3");
        h3Vorschau.innerHTML = "Vorschau";
        divClassBox.appendChild(h3Vorschau);
    }
    function fuellFrom(forName, elternElement) {
        let label = document.createElement("label");
        label.setAttribute("for", forName);
        label.innerHTML = forName + ":";
        elternElement.appendChild(label);
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name", forName);
        elternElement.appendChild(input);
    }
    function vorschauEis(radioWert) {
        let imgBehaehlter = document.createElement("img");
        if (radioWert == "true") {
            imgBehaehlter.setAttribute("src", "https://janinacpb.github.io/GIS-SoSe-2020/Endabgabe/Archiv/waffel.png");
            imgBehaehlter.setAttribute("class", "vWaffel vorschauBild");
        }
        else {
            imgBehaehlter.setAttribute("src", "https://janinacpb.github.io/GIS-SoSe-2020/Endabgabe/Archiv/becher.png");
            imgBehaehlter.setAttribute("class", "vBecher vorschauBild");
        }
        document.getElementById("eisVorschauKugeln")?.appendChild(imgBehaehlter);
    }
    /*
                if (index == 0) {
                   let radioWaffel: HTMLFormElement = <HTMLFormElement> document.getElementById("waffelFormular");
                   let radioWert: string = radioWaffel["auswahlBehaelter"].value;
                   localStorage.setItem("behaelterIstWaffel", radioWert);
                   vorschauEis(radioWert);
        } */
})(eisdiele || (eisdiele = {}));
//# sourceMappingURL=client.js.map