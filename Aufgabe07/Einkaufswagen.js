"use strict";
var Aufgabe07;
(function (Aufgabe07) {
    let gesamtPreisKasten = document.getElementById("gesamtPreisKasten");
    let zaehlerAnker = document.getElementById("zaehlerAnker");
    let zaehler = document.createElement("div");
    let flexboxArtikel = document.getElementById("flexbox");
    let menge = 0;
    let artikelImWarenkorb;
    let gesamtPreis = 0;
    let preisGesamt = document.createElement("p");
    if (localStorage.getItem("gesamtPreis")) {
        gesamtPreis = parseInt(localStorage.getItem("gesamtPreis"));
        gesamtPreisKasten.appendChild(preisGesamt);
        preisGesamt.innerHTML = "Gesamtreis: " + gesamtPreis + "€";
        let buttonDelet = document.createElement("button");
        gesamtPreisKasten.appendChild(buttonDelet);
        buttonDelet.setAttribute("class", "kaufen");
        buttonDelet.setAttribute("id", "loeschen");
        buttonDelet.innerHTML = "Lösche alle Artikel";
        buttonDelet.addEventListener("click", handlerAlleLoeschen);
        menge = parseInt(localStorage.getItem("menge"));
        zaehler.setAttribute("id", "zaehlerJs");
        zaehler.setAttribute("class", "zaehler");
        zaehlerAnker.appendChild(zaehler);
        zaehler.innerHTML = menge.toString();
    }
    if (localStorage.getItem("artikelImWarenkorbSpeicher")) {
        artikelImWarenkorb = JSON.parse(localStorage.getItem("artikelImWarenkorbSpeicher"));
        for (let indexWarenkorb = 0; indexWarenkorb < artikelImWarenkorb.length; indexWarenkorb++) {
            if (artikelImWarenkorb[indexWarenkorb] != null) {
                let div = document.createElement("div");
                let artikelname = document.createElement("h3");
                let bild = document.createElement("img");
                let pPreis = document.createElement("p");
                let buttonArtikel = document.createElement("button");
                flexboxArtikel.appendChild(div);
                div.setAttribute("class", "ware");
                div.setAttribute("id", indexWarenkorb.toString());
                div.appendChild(artikelname);
                artikelname.innerHTML = artikelImWarenkorb[indexWarenkorb].name;
                div.appendChild(bild);
                bild.setAttribute("src", artikelImWarenkorb[indexWarenkorb].bild);
                bild.setAttribute("class", "bildWare");
                bild.setAttribute("alt", artikelImWarenkorb[indexWarenkorb].name);
                div.appendChild(pPreis);
                pPreis.innerHTML = "Preis: " + artikelImWarenkorb[indexWarenkorb].preis + "€";
                div.appendChild(buttonArtikel);
                buttonArtikel.setAttribute("class", "kaufen");
                buttonArtikel.innerHTML = "Löschen";
                buttonArtikel.addEventListener("click", handlerArtikelEntfernen);
                function handlerArtikelEntfernen() {
                    menge = menge - 1;
                    zaehler.innerHTML = menge.toString();
                    localStorage.setItem("gesamtPreis", gesamtPreis.toString());
                    localStorage.setItem("menge", menge.toString());
                    gesamtPreis = gesamtPreis - artikelImWarenkorb[indexWarenkorb].preis;
                    preisGesamt.innerHTML = preisGesamt.innerHTML = "Gesamtreis: " + gesamtPreis + "€";
                    div.remove();
                    delete artikelImWarenkorb[indexWarenkorb];
                    //artikelImWarenkorb.splice(indexWarenkorb, 1);
                    localStorage.setItem("artikelImWarenkorbSpeicher", JSON.stringify(artikelImWarenkorb));
                    if (menge == 0) {
                        keineArtikelImWarenkorb();
                    }
                }
            }
        }
    }
    function handlerAlleLoeschen() {
        while (flexboxArtikel.hasChildNodes()) {
            flexboxArtikel.removeChild(flexboxArtikel.lastChild);
        }
        keineArtikelImWarenkorb();
    }
    function keineArtikelImWarenkorb() {
        localStorage.clear();
        menge = 0;
        zaehler.remove();
        while (gesamtPreisKasten.hasChildNodes()) {
            gesamtPreisKasten.removeChild(gesamtPreisKasten.lastChild);
        }
        let loeschMeldung = document.createElement("p");
        gesamtPreisKasten.appendChild(loeschMeldung);
        loeschMeldung.innerHTML = ("Sie haben keine Artikel im Warenkorb!");
    }
})(Aufgabe07 || (Aufgabe07 = {}));
//# sourceMappingURL=Einkaufswagen.js.map