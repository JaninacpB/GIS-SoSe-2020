namespace Eisdiele {

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
        nachname: string;
        stadt: string;
        strasse: string;
        vorname: string;
        eiskugel: string[];
        topping: string[];
        preis: number;
        _id: string; 
        geschmolzen ?: string;
    }
}