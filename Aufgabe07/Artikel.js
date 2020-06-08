"use strict";
var Aufgabe04;
(function (Aufgabe04) {
    //
    //let katAlltag: Array<Artikel> = [
    //   ersterArtikel, zweiterArtikel, dritterArtikel, vierterArtikel, fuenfterArtikel, sechsterArtikel, siebterArtikel, achterArtikel, neunterArtikel, zehnterArtikel, elfterArtikel, zwoelfterArtikel
    //]; 
    async function getArtikel(_url) {
        let artikelBekommen = await fetch(_url);
        console.log("Response", artikelBekommen);
    }
    let gesamtPreis = 0;
    let divZaehler = document.createElement("div");
    let menge = 0;
    for (let index = 0; index < katAlltag.length; index++) {
        console.log(JSON.stringify(katAlltag[index]));
        erstelleArtikel(true, true);
        function erstelleArtikel(_alltag, _helden) {
            let div = document.createElement("div");
            let nameUeberschrift = document.createElement("h3");
            let bild = document.createElement("img");
            let p1 = document.createElement("p");
            let p2 = document.createElement("p");
            let button = document.createElement("button");
            //erschaffen
            if (katAlltag[index].kategorieAlltag && _alltag && !document.getElementById(katAlltag[index].name)) {
                document.getElementById("alltagKat").appendChild(div);
                if (!document.getElementById("Alltag")) {
                    let alltagUeberschrift = document.createElement("h1");
                    document.getElementById("alltagH1").appendChild(alltagUeberschrift);
                    alltagUeberschrift.setAttribute("id", "Alltag");
                    alltagUeberschrift.innerHTML = "Alltag";
                }
                div.setAttribute("class", "alltag");
                div.setAttribute("id", katAlltag[index].name);
                document.getElementById(katAlltag[index].name).appendChild(nameUeberschrift);
                nameUeberschrift.innerHTML = katAlltag[index].name;
                document.getElementById(katAlltag[index].name).appendChild(bild);
                bild.setAttribute("src", katAlltag[index].bild);
                bild.setAttribute("class", "bildArtikel");
                bild.setAttribute("alt", katAlltag[index].name);
                document.getElementById(katAlltag[index].name).appendChild(p1);
                p1.innerHTML = katAlltag[index].beschreibung;
                p1.setAttribute("class", "beschreibung");
                document.getElementById(katAlltag[index].name).appendChild(p2);
                p2.innerHTML = "Preis: " + katAlltag[index].preis + "€";
                document.getElementById(katAlltag[index].name).appendChild(button);
                button.setAttribute("class", "kaufen");
                button.innerHTML = "Kaufen!";
            }
            if (katAlltag[index].kategorieHelden && _helden && !document.getElementById(katAlltag[index].name)) {
                document.getElementById("heldenKat").appendChild(div);
                if (!document.getElementById("helden")) {
                    let heldenUberschrift = document.createElement("h1");
                    document.getElementById("heldenH1")?.appendChild(heldenUberschrift);
                    heldenUberschrift.setAttribute("id", "helden");
                    heldenUberschrift.innerHTML = "Für Helden";
                }
                div.setAttribute("class", "alltag");
                div.setAttribute("id", katAlltag[index].name);
                document.getElementById(katAlltag[index].name).appendChild(nameUeberschrift);
                nameUeberschrift.innerHTML = katAlltag[index].name;
                document.getElementById(katAlltag[index].name).appendChild(bild);
                bild.setAttribute("src", katAlltag[index].bild);
                bild.setAttribute("class", "bildArtikel");
                bild.setAttribute("alt", katAlltag[index].name);
                document.getElementById(katAlltag[index].name).appendChild(p1);
                p1.innerHTML = katAlltag[index].beschreibung;
                p1.setAttribute("class", "beschreibung");
                document.getElementById(katAlltag[index].name).appendChild(p2);
                p2.innerHTML = "Preis: " + katAlltag[index].preis + "€";
                document.getElementById(katAlltag[index].name).appendChild(button);
                button.setAttribute("class", "kaufen");
                button.innerHTML = "Kaufen!";
            }
            button.addEventListener("click", handlerKaufen);
            document.getElementById("heldenFilter").addEventListener("click", handlerHeldenFilter);
            document.getElementById("alltagFilter").addEventListener("click", handlerAlltagFilter);
            document.getElementById("alleFilter").addEventListener("click", handlerAlleFilter);
            function handlerHeldenFilter() {
                div.remove();
                erstelleArtikel(false, true);
                if (document.getElementById("Alltag")) {
                    document.getElementById("Alltag")?.remove();
                }
            }
            function handlerAlltagFilter() {
                div.remove();
                erstelleArtikel(true, false);
                if (document.getElementById("helden")) {
                    document.getElementById("helden")?.remove();
                }
            }
            function handlerAlleFilter() {
                div.remove();
                erstelleArtikel(true, true);
            }
        }
        function handlerKaufen() {
            if (gesamtPreis == 0) {
                document.getElementById("zaehlerJs").appendChild(divZaehler);
                divZaehler.setAttribute("class", "zaehler");
                divZaehler.innerHTML = "1";
                menge = 1;
            }
            else {
                menge += 1;
                divZaehler.innerHTML = "" + menge;
            }
            gesamtPreis = gesamtPreis + katAlltag[index].preis;
            console.log(gesamtPreis);
        }
    }
})(Aufgabe04 || (Aufgabe04 = {}));
//# sourceMappingURL=Artikel.js.map