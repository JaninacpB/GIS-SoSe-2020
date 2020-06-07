namespace Aufgabe04 {

interface Artikel {
    name: string;
    beschreibung: string; 
    preis: number;
    bild: string;
    kategorieAlltag: boolean;
    kategorieHelden: boolean;
}

let ersterArtikel: Artikel = {
    name: "Geschirr",
    beschreibung: "Sie wollen ihre Gäste begeistern? Ihr Essen von allen Seiten bewundern? Dann ist dieses unsichtbare Geschirr wie gemacht für sie",
    preis: 80, bild: "https://janinacpb.github.io/GIS-SoSe-2020/Aufgabe04/Archiv/artikel2.jpg", kategorieAlltag: true, kategorieHelden: false};

let zweiterArtikel: Artikel = {
        name: "Decke",
        beschreibung: "Dir ist kalt, aber du willst nicht das andere sehen, wie schwach du bist, und dass du dich am liebsten in einer Decke verkrümmeln möchtest? Hör dir nie wieder blöde Sprüche an und genieße den Vorteil einer unsichtbaren Decke.",
        preis: 30, bild: "https://janinacpb.github.io/GIS-SoSe-2020/Aufgabe04/Archiv/artikel1.jpg", kategorieAlltag: true, kategorieHelden: false};

let dritterArtikel: Artikel = {
        name: "Zucker",
        beschreibung: "Wenn du es nicht sehen kannst, zählt es dann wirklich? Wir glauben nein!",
        preis: 3, bild: "https://janinacpb.github.io/GIS-SoSe-2020/Aufgabe04/Archiv/artikel3.jpg", kategorieAlltag: true, kategorieHelden: false};

let vierterArtikel: Artikel = {
        name: "Socken",
        beschreibung: "Du liebst das Gefühl von Socken und Sandallen, aber all deine Freunde sind nun nicht mehr deine Freunde, weil du Socken in Sanadallen trägst? Oh man haben wir gute Neuigkeiten für dich!",
        preis: 15, bild: "https://janinacpb.github.io/GIS-SoSe-2020/Aufgabe04/Archiv/artikel4.jpg", kategorieAlltag: true, kategorieHelden: false};

let fuenfterArtikel: Artikel = {
        name: "Bild",
        beschreibung: "Die Schönheit dieser Gemälde sind kaum bereifbar. Jeder wird über dich und deinen grandiosen Stil sprechen, denn keiner kann hassen was er nicht sieht!",
        preis: 100, bild: "https://janinacpb.github.io/GIS-SoSe-2020/Aufgabe04/Archiv/artikel5.png", kategorieAlltag: true, kategorieHelden: false};

let sechsterArtikel: Artikel = {
        name: "Spiegel",
        beschreibung: "Ich meine... wir alle wissen, dass du gut aussiehst, daher kaufe dir den ultimativen Beweis, dass du dir absolut sicher bist, dass du umwerfend bist!",
        preis: 50, bild: "https://janinacpb.github.io/GIS-SoSe-2020/Aufgabe04/Archiv/artikel6.jpg", kategorieAlltag: true, kategorieHelden: false};

let siebterArtikel: Artikel = {
        name: "Stimme",
        beschreibung: "Ich meine... wir alle wissen, dass du gut aussiehst, daher kaufe dir den ultimativen Beweis, dass du dir absolut sicher bist, dass du umwerfend bist!",
        preis: 1, bild: "https://janinacpb.github.io/GIS-SoSe-2020/Aufgabe04/Archiv/artikel7.jpg", kategorieAlltag: true, kategorieHelden: false};

let achterArtikel: Artikel = {
        name: "Der eine Ring",
        beschreibung: "Wir haben diesen einzigartige Ring (und 2000 Kopien) in einer Kiste auf dem Dachboden gefunden. Interesse?",
        preis: 2000, bild: "https://janinacpb.github.io/GIS-SoSe-2020/Aufgabe04/Archiv/artikel4.jpg", kategorieAlltag: false, kategorieHelden: true};
        
let neunterArtikel: Artikel = {
        name: "Umhang",
        beschreibung: "Bist du oder der Umhang unsichtbar? Wir wissen es nicht, allen den wir den Umhang und 100 000€ gaben sind plötzlich auf ewig verschwunden.",
        preis: 100, bild: "https://janinacpb.github.io/GIS-SoSe-2020/Aufgabe04/Archiv/artikel5.png", kategorieAlltag: false, kategorieHelden: true};
        
let zehnterArtikel: Artikel = {
        name: "Verzauberter Spiegel",
        beschreibung: "Wie ein normaler unsichtbarer Spiegel, wie jeder ihn zuhause hat. Nur ist es halt auch verfluch- zverzaubert!",
        preis: 450, bild: "https://janinacpb.github.io/GIS-SoSe-2020/Aufgabe04/Archiv/artikel6.jpg", kategorieAlltag: false, kategorieHelden: true};
        
let elfterArtikel: Artikel = {
        name: "Zauberstab",
        beschreibung: "Leid, dass jeder deinen Zauberstab klaut? Jetzt nicht mehr! Mit diesem unsichtbaren Zauberstab, kannst nicht einmal du ihn mehr finden! Wow!",
        preis: 5000, bild: "https://janinacpb.github.io/GIS-SoSe-2020/Aufgabe04/Archiv/artikel4.jpg", kategorieAlltag: false, kategorieHelden: true};
        
let zwoelfterArtikel: Artikel = {
        name: "Tom",
        beschreibung: "Tom ist unsichtbar.",
        preis: 50, bild: "https://janinacpb.github.io/GIS-SoSe-2020/Aufgabe04/Archiv/artikel6.jpg", kategorieAlltag: false, kategorieHelden: true};      

let katAlltag: Array<Artikel> = [
    ersterArtikel, zweiterArtikel, dritterArtikel, vierterArtikel, fuenfterArtikel, sechsterArtikel, siebterArtikel, achterArtikel, neunterArtikel, zehnterArtikel, elfterArtikel, zwoelfterArtikel
]; 

let gesamtPreis: number = 0;
let divZaehler: HTMLElement = document.createElement("div");
let menge: number = 0;

for (let index: number = 0; index < katAlltag.length; index++) {
        
        erstelleArtikel( true, true );

        function erstelleArtikel(_alltag: boolean, _helden: boolean): void {
                
                let div: HTMLElement = document.createElement("div");
                let nameUeberschrift: HTMLElement = document.createElement("h3");
                let bild: HTMLElement = document.createElement("img");
                let p1: HTMLElement = document.createElement("p");
                let p2: HTMLElement = document.createElement("p");
                let button: HTMLElement = document.createElement("button");

                //erschaffen
                if (katAlltag[index].kategorieAlltag && _alltag && !document.getElementById(katAlltag[index].name)) {
                        document.getElementById("alltagKat")!.appendChild(div);
                
                        if (!document.getElementById("Alltag")) {
                                let alltagUeberschrift: HTMLElement = document.createElement("h1");
                                document.getElementById("alltagH1")!.appendChild(alltagUeberschrift);
                                alltagUeberschrift.setAttribute("id", "Alltag");
                                alltagUeberschrift.innerHTML = "Alltag";
                         }

                        div.setAttribute("class", "alltag");
                        div.setAttribute("id", katAlltag[index].name);
                 
                        document.getElementById(katAlltag[index].name)!.appendChild(nameUeberschrift);
                        nameUeberschrift.innerHTML = katAlltag[index].name;
                
                        document.getElementById(katAlltag[index].name)!.appendChild(bild);
                        bild.setAttribute("src",  katAlltag[index].bild);
                        bild.setAttribute("class", "bildArtikel");
                        bild.setAttribute("alt", katAlltag[index].name);
                
                        document.getElementById(katAlltag[index].name)!.appendChild(p1);
                        p1.innerHTML =  katAlltag[index].beschreibung;
                        p1.setAttribute("class", "beschreibung");
                
                        document.getElementById(katAlltag[index].name)!.appendChild(p2);
                        p2.innerHTML = "Preis: " +  katAlltag[index].preis + "€";
                
                        document.getElementById(katAlltag[index].name)!.appendChild(button);
                        button.setAttribute("class", "kaufen");
                        button.innerHTML = "Kaufen!";

        }
                if (katAlltag[index].kategorieHelden && _helden && !document.getElementById(katAlltag[index].name)) {
                        document.getElementById("heldenKat")!.appendChild(div); 
                
                        if (!document.getElementById("helden")) {
                                let heldenUberschrift: HTMLElement = document.createElement("h1");
                                document.getElementById("heldenH1")?.appendChild(heldenUberschrift);
                                heldenUberschrift.setAttribute("id", "helden");
                                heldenUberschrift.innerHTML = "Für Helden";
                }
                        div.setAttribute("class", "alltag");
                        div.setAttribute("id", katAlltag[index].name);
                 
                        document.getElementById(katAlltag[index].name)!.appendChild(nameUeberschrift);
                        nameUeberschrift.innerHTML = katAlltag[index].name;
                
                        document.getElementById(katAlltag[index].name)!.appendChild(bild);
                        bild.setAttribute("src",  katAlltag[index].bild);
                        bild.setAttribute("class", "bildArtikel");
                        bild.setAttribute("alt", katAlltag[index].name);
                
                        document.getElementById(katAlltag[index].name)!.appendChild(p1);
                        p1.innerHTML =  katAlltag[index].beschreibung;
                        p1.setAttribute("class", "beschreibung");
                
                        document.getElementById(katAlltag[index].name)!.appendChild(p2);
                        p2.innerHTML = "Preis: " +  katAlltag[index].preis + "€";
                
                        document.getElementById(katAlltag[index].name)!.appendChild(button);
                        button.setAttribute("class", "kaufen");
                        button.innerHTML = "Kaufen!";
        }
                button.addEventListener("click", handlerKaufen);

                document.getElementById("heldenFilter")!.addEventListener("click", handlerHeldenFilter);

                document.getElementById("alltagFilter")!.addEventListener("click", handlerAlltagFilter);

                document.getElementById("alleFilter")!.addEventListener("click", handlerAlleFilter);

                function handlerHeldenFilter(): void {     

                        div.remove();

                        erstelleArtikel(false, true);

                        if (document.getElementById("Alltag")) {
                                document.getElementById("Alltag")?.remove();
                        }
                } 

                function handlerAlltagFilter(): void {
                        
                        div.remove(); 

                        erstelleArtikel(true, false); 
                        
                        if (document.getElementById("helden")) {
                                document.getElementById("helden")?.remove();
                        }

                               
                }

                function handlerAlleFilter(): void {
                        div.remove();
                        erstelleArtikel(true, true);
                }

        }        

        function handlerKaufen(): void {
                
                if (gesamtPreis == 0) {
                        document.getElementById("zaehlerJs")!.appendChild(divZaehler);
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

}
