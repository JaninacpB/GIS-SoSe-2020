"use strict";
var Aufgabe08;
(function (Aufgabe08) {
    let button = document.getElementById("SubmitButton");
    button.addEventListener("click", handlerButton);
    async function handlerButton() {
        let formData = new FormData(document.forms[0]);
        let url = "https://sosegis2020.herokuapp.com/";
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        console.log((await fetch(url)).url);
    }
})(Aufgabe08 || (Aufgabe08 = {}));
//# sourceMappingURL=Artikel08.js.map