namespace Aufgabe08 {

    let button: HTMLButtonElement = <HTMLButtonElement> document.getElementById("SubmitButton");

    button.addEventListener("click", handlerButton);

    async function handlerButton(): Promise<void> { 

        let formData: FormData = new FormData(document.forms[0]);
        let url: string = "https://sosegis2020.herokuapp.com/";
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "?" + query.toString();
    
        console.log((await fetch(url)).url);
    }

}