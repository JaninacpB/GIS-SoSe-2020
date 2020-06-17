"use strict";
var Aufgabe08;
(function (Aufgabe08) {
    let formData = new FormData(document.forms[0]);
    ausgabe();
    async function ausgabe() {
        let url = "https://whatever.server/path/file";
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        await fetch(url);
        console.log(url);
    }
})(Aufgabe08 || (Aufgabe08 = {}));
//# sourceMappingURL=Artikel08.js.map