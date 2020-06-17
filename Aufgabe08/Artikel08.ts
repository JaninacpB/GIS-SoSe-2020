namespace Aufgabe08 {

    let button: HTMLButtonElement = <HTMLButtonElement> document.getElementById("SubmitButton");
    let formData: FormData = new FormData(document.forms[0]);

    button.addEventListener("click", handlerButton);


    function handlerButton(): void {
        ausgabe();
    }

    async function ausgabe(): Promise<void> { 

    let url: string = "https://sosegis2020.herokuapp.com/";
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    url = url + "?" + formData.toString();
    let serverDaten: any = await fetch(url);
    console.log(serverDaten);

    for (let entry of query) {
        console.log(entry);
        console.log("name: " + entry[0]);
        console.log("value: " + entry[1]);
    }

    }

}