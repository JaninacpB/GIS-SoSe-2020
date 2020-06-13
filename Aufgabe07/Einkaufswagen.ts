namespace Aufgabe07 {

    let gesamtPreisKasten: HTMLElement = <HTMLElement> document.getElementById("gesamtPreisKasten");
    let zaehlerAnker: HTMLElement = <HTMLElement> document.getElementById("zaehlerAnker");
    let zaehler: HTMLElement = <HTMLElement> document.createElement("div");
    let flexboxArtikel: HTMLElement = <HTMLElement> document.getElementById("flexbox");
    let menge: number = 0;
    let artikelImWarenkorb: Array <Artikel>;
    let gesamtPreis: number = 0;
    let preisGesamt: HTMLElement = document.createElement("p");

    if (localStorage.getItem("gesamtPreis")) {
        gesamtPreis = parseInt(localStorage.getItem("gesamtPreis")!);
        gesamtPreisKasten!.appendChild(preisGesamt);
        preisGesamt.innerHTML = "Gesamtreis: " + gesamtPreis + "€";

        let buttonDelet: HTMLButtonElement = document.createElement("button");
        gesamtPreisKasten!.appendChild(buttonDelet);
        buttonDelet.setAttribute("class", "kaufen");
        buttonDelet.setAttribute("id", "loeschen");
        buttonDelet.innerHTML = "Lösche alle Artikel";

        buttonDelet.addEventListener("click", handlerAlleLoeschen);

        menge = parseInt(localStorage.getItem("menge")!);
        zaehler.setAttribute("id", "zaehlerJs");
        zaehler.setAttribute("class", "zaehler");
        zaehlerAnker!.appendChild(zaehler);
        zaehler.innerHTML = menge!.toString();
    }

    if (localStorage.getItem("artikelImWarenkorbSpeicher")) {
       artikelImWarenkorb = JSON.parse(localStorage.getItem("artikelImWarenkorbSpeicher")!);

       for (let indexWarenkorb: number = 0; indexWarenkorb < artikelImWarenkorb.length; indexWarenkorb++) {

        if (artikelImWarenkorb[indexWarenkorb] != null) {
        let div: HTMLElement = document.createElement("div");
        let artikelname: HTMLElement = document.createElement("h3");
        let bild: HTMLElement = document.createElement("img");
        let pPreis: HTMLElement = document.createElement("p");
        let buttonArtikel: HTMLElement = document.createElement("button");

        flexboxArtikel.appendChild(div);
        div.setAttribute("class", "ware");
        div.setAttribute("id", indexWarenkorb.toString());
                 
        div.appendChild(artikelname);
        artikelname.innerHTML = artikelImWarenkorb[indexWarenkorb].name;
                
        div.appendChild(bild);
        bild.setAttribute("src",  artikelImWarenkorb[indexWarenkorb].bild);
        bild.setAttribute("class", "bildWare");
        bild.setAttribute("alt", artikelImWarenkorb[indexWarenkorb].name);
                
        div.appendChild(pPreis);
        pPreis.innerHTML = "Preis: " +  artikelImWarenkorb[indexWarenkorb].preis + "€";
                
        div.appendChild(buttonArtikel);
        buttonArtikel.setAttribute("class", "kaufen");
        buttonArtikel.innerHTML = "Löschen";

        buttonArtikel.addEventListener("click", handlerArtikelEntfernen);

        function handlerArtikelEntfernen(): void {
            menge = menge - 1;
            zaehler.innerHTML = menge.toString();
            gesamtPreis -= artikelImWarenkorb[indexWarenkorb].preis;
            console.log(artikelImWarenkorb);
            localStorage.setItem("gesamtPreis", gesamtPreis.toString());
            localStorage.setItem("menge", menge.toString());
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

    function handlerAlleLoeschen(): void {

        while (flexboxArtikel.hasChildNodes()) {
            flexboxArtikel.removeChild(<Node> flexboxArtikel.lastChild);
        }

        keineArtikelImWarenkorb();
    }

    function keineArtikelImWarenkorb(): void {

        localStorage.clear();
        menge = 0;
        zaehler.remove();

        while (gesamtPreisKasten.hasChildNodes()) {
            gesamtPreisKasten.removeChild(<Node> gesamtPreisKasten.lastChild);
        }
        let loeschMeldung: HTMLElement = document.createElement("p");
        gesamtPreisKasten.appendChild(loeschMeldung);
        loeschMeldung.innerHTML = ("Sie haben keine Artikel im Warenkorb!");
    }
}