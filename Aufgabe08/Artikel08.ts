namespace Aufgabe08 {

    let formData: FormData = new FormData(document.forms[0]);
    ausgabe();

    async function ausgabe(): Promise<void> { 
    let url: string = "https://whatever.server/path/file";
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    url = url + "?" + query.toString();
    await fetch(url);
    console.log(url);
    }

}