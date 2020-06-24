"use strict";
var Aufgabe08;
(function (Aufgabe08) {
    let button = document.getElementById("SubmitButton");
    let buttonJson = document.getElementById("jsonButton");
    button.addEventListener("click", handlerButton);
    buttonJson.addEventListener("click", handlerButtonJson);
    async function handlerButton() {
        let formData = new FormData(document.forms[0]);
        let url = "https://sosegis2020.herokuapp.com";
        let query = new URLSearchParams(formData);
        url = url + "/html" + "?" + query.toString();
        let datenServer = await fetch(url);
        let datenString = await datenServer.text();
        let paragraph = document.createElement("p");
        paragraph.innerHTML = datenString;
        document.body.appendChild(paragraph);
    }
    async function handlerButtonJson() {
        let formData = new FormData(document.forms[0]);
        let url = "https://sosegis2020.herokuapp.com";
        let query = new URLSearchParams(formData);
        url = url + "/json" + "?" + query.toString();
        let jsonDatei = await fetch(url);
        console.log(await (jsonDatei.json()));
    }
})(Aufgabe08 || (Aufgabe08 = {}));
//# sourceMappingURL=Artikel09.js.map