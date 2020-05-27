namespace Aufgabe04 {

interface Artikel {
    name: string;
    beschreibung: string; 
    preis: number;
    bild: string;
    kategorieAlltag: boolean;
    kategorieHelden: boolean;
}

//Artikel anfang

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
    
        //Neue Kategorie

let achterArtikel: Artikel = {
        name: "Der eine Ring",
        beschreibung: "Wir haben diesen einzigartige Ring (und 2000 Kopien) in einer Kiste auf dem Dachboden gefunden. Interesse?",
        preis: 2000, bild: "https://janinacpb.github.io/GIS-SoSe-2020/Aufgabe04/Archiv/artikel4.jpg", kategorieAlltag: false, kategorieHelden: true};
        
let neunterArtikel: Artikel = {
        name: "Umhang",
        beschreibung: "Bist du oder der Umhang unsichtbar? Wir wissen es nicht, allen den wir den Umhang und 100 000€ gaben sind plötzlich auf ewig verschwunden.",
        preis: 100, bild: "https://janinacpb.github.io/GIS-SoSe-2020/Aufgabe04/Archiv/artikel5.png", kategorieAlltag: false, kategorieHelden: true};
        
let zehnterArtikel: Artikel = {
        name: "Zverzauberter Spiegel",
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
        

//Artikel Ende

// Array erstellen für alle Elemente 

let katAlltag: Array<Artikel> = [
    ersterArtikel, zweiterArtikel, dritterArtikel, vierterArtikel, fuenfterArtikel, sechsterArtikel, siebterArtikel, achterArtikel, neunterArtikel, zehnterArtikel, elfterArtikel, zwoelfterArtikel
]; 

// Alltag Kategorie Anfang
for (let index: number = 0; index < katAlltag.length; index++) {

    if (katAlltag[index].kategorieAlltag) {

        let div: HTMLElement = document.createElement("div");
        document.getElementById("alltagKat")!.appendChild(div);
        div.setAttribute("class", "alltag");
        div.setAttribute("id", katAlltag[index].name);
        
        let nameUeberschrift: HTMLElement = document.createElement("h3");
        document.getElementById(katAlltag[index].name)!.appendChild(nameUeberschrift);
        nameUeberschrift.innerHTML = katAlltag[index].name;
        
        let bild: HTMLElement = document.createElement("img");
        document.getElementById(katAlltag[index].name)!.appendChild(bild);
        bild.setAttribute("src",  katAlltag[index].bild);
        bild.setAttribute("class", "bildArtikel");
        
        let p1: HTMLElement = document.createElement("p");
        document.getElementById(katAlltag[index].name)!.appendChild(p1);
        p1.innerHTML =  katAlltag[index].beschreibung;
        
        let p2: HTMLElement = document.createElement("p");
        document.getElementById(katAlltag[index].name)!.appendChild(p2);
        p2.innerHTML = "Preis: " +  katAlltag[index].preis + "€";
        
        let button: HTMLElement = document.createElement("button");
        document.getElementById(katAlltag[index].name)!.appendChild(button);
        button.setAttribute("class", "kaufen");
        button.innerHTML = "Kaufen!";
}

    if (katAlltag[index].kategorieHelden)  {

        let div: HTMLElement = document.createElement("div");
        document.getElementById("heldenKat")!.appendChild(div);
        div.setAttribute("class", "alltag");
        div.setAttribute("id", katAlltag[index].name);
    
        let nameUeberschrift: HTMLElement = document.createElement("h3");
        document.getElementById(katAlltag[index].name)!.appendChild(nameUeberschrift);
        nameUeberschrift.innerHTML = katAlltag[index].name;
    
        let bild: HTMLElement = document.createElement("img");
        document.getElementById(katAlltag[index].name)!.appendChild(bild);
        bild.setAttribute("src",  katAlltag[index].bild);
        bild.setAttribute("class", "bildArtikel");
            
        let p1: HTMLElement = document.createElement("p");
        document.getElementById(katAlltag[index].name)!.appendChild(p1);
        p1.innerHTML =  katAlltag[index].beschreibung;
        
        let p2: HTMLElement = document.createElement("p");
        document.getElementById(katAlltag[index].name)!.appendChild(p2);
        p2.innerHTML = "Preis: " +  katAlltag[index].preis + "€";
        
        let button: HTMLElement = document.createElement("button");
        document.getElementById(katAlltag[index].name)!.appendChild(button);
        button.setAttribute("class", "kaufen");
        button.innerHTML = "Kaufen!";
}

}
// Alltag Ende 

//#Element_hinzufügen anfang
/*
let div: HTMLElement = document.createElement("div");
document.getElementById("alltagKat")!.appendChild(div);
div.setAttribute("class", "alltag");
div.setAttribute("id", "alltag");

let nameUeberschrift: HTMLElement = document.createElement("h3");
document.getElementById("alltag")!.appendChild(nameUeberschrift);
nameUeberschrift.innerHTML = ersterArtikel.name;

let bild: HTMLElement = document.createElement("img");
document.getElementById("alltag")!.appendChild(bild);
bild.setAttribute("src", ersterArtikel.bild);
bild.setAttribute("class", "bildArtikel");

let p1: HTMLElement = document.createElement("p");
document.getElementById("alltag")!.appendChild(p1);
p1.innerHTML = zweiterArtikel.beschreibung;

let p2: HTMLElement = document.createElement("p");
document.getElementById("alltag")!.appendChild(p2);
p2.innerHTML = "Preis: " + zweiterArtikel.preis + "€";

let button: HTMLElement = document.createElement("button");
document.getElementById("alltag")!.appendChild(button);
button.setAttribute("class", "kaufen");
button.innerHTML = "Kaufen!";

//#Element_hinzufügen ende

*/
/*
<div class="alltag">
            <h3>Decke</h3>
            <img>
            <p>Beschreibung </p>
            <p>Preis: 30€</p>
            <button class="kaufen">Kauf mich!</button>
        </div>*/
}