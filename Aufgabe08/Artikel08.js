"use strict";
var Aufgabe08;
(function (Aufgabe08) {
    let button = document.getElementById("SubmitButton");
    let formData = new FormData(document.forms[0]);
    button.addEventListener("click", handlerButton);
    function handlerButton() {
        ausgabe();
    }
    async function ausgabe() {
        let url = "https://sosegis2020.herokuapp.com/";
        let query = new URLSearchParams(formData);
        url = url + "?" + formData.toString();
        let serverDaten = await fetch(url);
        console.log(serverDaten);
        for (let entry of query) {
            console.log(entry);
            console.log("name: " + entry[0]);
            console.log("value: " + entry[1]);
        }
    }
})(Aufgabe08 || (Aufgabe08 = {}));
//# sourceMappingURL=Artikel08.js.map