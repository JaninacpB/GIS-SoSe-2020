namespace eisdiele { 

   export interface Beahelter {
        name: string;
        bild: string;
        alt: string;
        for: string;
        value: string;
        id: string;
    } 

   export interface EissortenUTopping {
        name: string;
        preis: number;
        bild: string;
        alt: string;
        bildComic: string;
    }

   export interface Bestellung {
        id: string;
        name: string[];
        preis: number;
        vorname: string;
        nachname: string;
        strasse: string;
        stadt: string;
    }
}