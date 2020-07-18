"use strict";
var Eisdiele;
(function (Eisdiele) {
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
        let radioWaffel = document.getElementById("waffelFormular");
        let radioWert = radioWaffel["auswahlBehaelter"].value;
        if (radioWert == "true") {
            meinBecherIstWaffel = true;
        }
        else {
            meinBecherIstWaffel = false;
        }
        let flexWaffel = document.getElementById("flexWaffel");
        let flexboxSchrittEins = document.getElementById("flexboxschritt1");
        flexboxSchrittEins.remove();
        flexWaffel.remove();
        let flexKugel = document.createElement("div");
        let uerbschriftKugel = document.createElement("div");
        let flexboxSchrittZwei = document.createElement("div");
        erstellHeaderSchritt(flexKugel, uerbschriftKugel, flexboxSchrittZwei, "Kugel", "eins", 2, "Wähle deine Eissorte!");
        artikelEinsortieren(flexboxSchrittZwei, eissorten);
        let buttonZweiterSchritt = erstellButton("zwei", 3, flexboxSchrittZwei);
        buttonZweiterSchritt.addEventListener("click", handlerLoeschZweiMachDrei);
    }
    function handlerLoeschZweiMachDrei() {
        if (meineBestellungEis == undefined) {
            alert("Wähle eine Eissorte aus!");
        }
        else {
            let flexKugel = document.getElementById("flexKugel");
            let flexboxSchrittZwei = document.getElementById("flexboxschritt2");
            flexboxSchrittZwei.remove();
            flexKugel.remove();
            let flexTopping = document.createElement("div");
            let uerbschriftTopping = document.createElement("div");
            let flexboxSchrittDrei = document.createElement("div");
            erstellHeaderSchritt(flexTopping, uerbschriftTopping, flexboxSchrittDrei, "Topping", "zwei", 3, "Wähle dein Topping!");
            artikelEinsortieren(flexboxSchrittDrei, toppingArten);
            let buttonDritterSchritt = erstellButton("zweiter", 4, flexboxSchrittDrei);
            buttonDritterSchritt.addEventListener("click", handlerLoeschDreiMachVier);
        }
    }
    function handlerLoeschDreiMachVier() {
        let flexTopping = document.getElementById("flexTopping");
        let flexboxSchrittDrei = document.getElementById("flexboxschritt3");
        flexboxSchrittDrei.remove();
        flexTopping.remove();
        let flexBestellen = document.createElement("div");
        let uerbschriftBestellen = document.createElement("div");
        let flexboxSchrittVier = document.createElement("div");
        erstellHeaderSchritt(flexBestellen, uerbschriftBestellen, flexboxSchrittVier, "Bestellen", "eins", 4, "Bestellen!");
        let formBestellen = document.createElement("form");
        formBestellen.setAttribute("class", "versandt");
        flexboxSchrittVier.appendChild(formBestellen);
        fuellFrom("vorname", formBestellen);
        fuellFrom("nachname", formBestellen);
        fuellFrom("strasse", formBestellen);
        fuellFrom("stadt", formBestellen);
        let h3Form = document.createElement("h3");
        h3Form.innerHTML = "Weitere Anmerkungen";
        formBestellen.appendChild(h3Form);
        let preisNumber = +localStorage.getItem("gesamtpreis");
        let h3Preis = document.createElement("h3");
        h3Preis.innerHTML = "Alles zusammen macht das: <u>" + preisNumber.toFixed(2) + "€ </u>";
        formBestellen.appendChild(h3Preis);
        eisvorschauboxErstellen(flexboxSchrittVier);
        vorschauEis(meineBestellungEis, meineBestellungTopping, meinBecherIstWaffel);
        let buttonDritterSchritt = erstellButton("vier", 0, formBestellen);
        buttonDritterSchritt.setAttribute("type", "submit");
        buttonDritterSchritt.setAttribute("style", "display: block");
        buttonDritterSchritt.setAttribute("action", "https://sosegis2020.herokuapp.com");
        buttonDritterSchritt.addEventListener("click", handlerAbschicken);
    }
    function handlerAbschicken() {
        let datenZumVerschicken = "";
        for (let index = 0; index < meineBestellungEis.length; index++) {
            datenZumVerschicken += "eiskugel" + "=" + meineBestellungEis[index].name + "&";
        }
        if (meineBestellungTopping) {
            for (let index = 0; index < meineBestellungTopping.length; index++) {
                datenZumVerschicken += "topping" + "=" + meineBestellungTopping[index].name + "&";
            }
        }
        let datenForm = new FormData(document.forms[0]);
        let urlSendenZu = "";
        let query = new URLSearchParams(datenForm);
        let queryString = query.toString();
        let endgueltigerPreis = "preis=" + localStorage.getItem("gesamtpreis") + "&";
        urlSendenZu = "https://sosegis2020.herokuapp.com" + "/eingabe?" + datenZumVerschicken + endgueltigerPreis + queryString;
        fetch(urlSendenZu);
    }
    function erstellHeaderSchritt(_flexArtikel, _ueberschriftArtikel, _flexboxSchritt, _nameArtikel, _classUeberschrift, _aktuellerSchritt, _satzOben) {
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
    function artikelEinsortieren(_elternElement, _artikelArt) {
        for (let index = 0; index <= _artikelArt.length; index++) {
            let divClassBox = document.createElement("div");
            divClassBox.setAttribute("class", "artikelBox");
            divClassBox.setAttribute("id", "divClassBox");
            _elternElement.appendChild(divClassBox);
            if (index == _artikelArt.length) {
                eisvorschauboxErstellen(divClassBox);
                vorschauEis(meineBestellungEis, meineBestellungTopping, meinBecherIstWaffel);
            }
            else {
                let imgEis = document.createElement("img");
                imgEis.setAttribute("class", "artikelBild");
                imgEis.setAttribute("src", _artikelArt[index].bild);
                imgEis.setAttribute("alt", _artikelArt[index].alt);
                divClassBox.appendChild(imgEis);
                let div = document.createElement("div");
                divClassBox.appendChild(div);
                let h3Name = document.createElement("h3");
                h3Name.innerHTML = _artikelArt[index].name;
                div.appendChild(h3Name);
                let h3Preis = document.createElement("h3");
                h3Preis.innerHTML = _artikelArt[index].preis + "€";
                div.appendChild(h3Preis);
                let buttonEis = document.createElement("button");
                buttonEis.setAttribute("class", "hinzufuegenEis");
                buttonEis.innerHTML = "+add";
                div.appendChild(buttonEis);
                buttonEis.addEventListener("click", eisHinzufuegen);
                function eisHinzufuegen() {
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
                                let schonimWagen = false;
                                for (let indexX = 0; indexX < meineBestellungTopping.length; indexX++) {
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
                    let gesamtPreis = 0;
                    if (meineBestellungEis) {
                        for (let index1 = 0; index1 < meineBestellungEis.length; index1++) {
                            gesamtPreis += meineBestellungEis[index1].preis;
                        }
                    }
                    if (meineBestellungTopping) {
                        for (let index1 = 0; index1 < meineBestellungTopping.length; index1++) {
                            gesamtPreis += meineBestellungTopping[index1].preis;
                        }
                    }
                    let gesamtPreisString = gesamtPreis.toString();
                    localStorage.setItem("gesamtpreis", gesamtPreisString);
                    vorschauEis(meineBestellungEis, meineBestellungTopping, meinBecherIstWaffel);
                }
            }
        }
    }
    function erstellButton(_schritt, _naechsterSchritt, _elternElement) {
        let button = document.createElement("button");
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
    function eisvorschauboxErstellen(_elternElement) {
        let divClassBox = document.createElement("div");
        divClassBox.setAttribute("class", "artikelBox");
        divClassBox.setAttribute("id", "vorschau");
        _elternElement.appendChild(divClassBox);
        let div = document.createElement("div");
        div.setAttribute("class", "eisVorschau");
        div.setAttribute("id", "eisVorschauKugeln");
        divClassBox.appendChild(div);
        let h3Vorschau = document.createElement("h3");
        h3Vorschau.innerHTML = "Vorschau";
        divClassBox.appendChild(h3Vorschau);
    }
    function fuellFrom(_forName, _elternElement) {
        let label = document.createElement("label");
        label.setAttribute("for", _forName);
        label.innerHTML = _forName + ":";
        _elternElement.appendChild(label);
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name", _forName);
        input.required = true;
        _elternElement.appendChild(input);
    }
    function vorschauEis(_eis, _topping, _waffelJa) {
        if (document.getElementById("eisVorschauKugeln")?.hasChildNodes) {
            let loeschen = document.getElementById("eisVorschauKugeln");
            for (let anzahlKugel = 0; anzahlKugel <= eissorten.length; anzahlKugel++) {
                loeschen.firstChild?.remove();
            }
            for (let anzahlKugel = 0; anzahlKugel < toppingArten.length; anzahlKugel++) {
                loeschen.firstChild?.remove();
            }
        }
        let imgBehaehlter = document.createElement("img");
        imgBehaehlter.setAttribute("id", "exestiertWaffel");
        let div = document.getElementById("eisVorschauKugeln");
        if (_waffelJa) {
            imgBehaehlter.setAttribute("src", "https://janinacpb.github.io/GIS-SoSe-2020/Endabgabe/Archiv/waffel.png");
            imgBehaehlter.setAttribute("class", "vWaffel vorschauBild");
            div.appendChild(imgBehaehlter);
            if (_eis) {
                for (let index = 0; index < _eis.length; index++) {
                    fuegEisHinzu(_eis[index], index, div, true);
                }
            }
            if (_topping) {
                for (let index = 0; index < _topping.length; index++) {
                    let imgEisTopping = document.createElement("img");
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
                for (let index = 0; index < _eis.length; index++) {
                    fuegEisHinzu(_eis[index], index, div, false);
                }
            }
            if (_topping) {
                for (let index = 0; index < _topping.length; index++) {
                    fuegToppingHinzu(_topping[index], _eis, div, false);
                }
            }
        }
        document.getElementById("eisVorschauKugeln")?.appendChild(imgBehaehlter);
    }
    function fuegToppingHinzu(_top, _eis, _elternElement, _istWaffel) {
        let imgEisTopping = document.createElement("img");
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
    function fuegEisHinzu(_eis, _index, _elternElement, _istWaffle) {
        let zaehlerAngepasst = _index + 1;
        let imgEisKugel = document.createElement("img");
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
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=client.js.map