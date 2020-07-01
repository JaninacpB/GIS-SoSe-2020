
namespace Aufgabe10 {
    // mongodb+srv://janinaBach:<password>@janinabach.ospoe.mongodb.net/<dbname>?retryWrites=true&w=majority
    let button: HTMLButtonElement = <HTMLButtonElement> document.getElementById("SubmitButton");
    let buttonJson: HTMLButtonElement = <HTMLButtonElement> document.getElementById("jsonButton");

    button.addEventListener("click", handlerButton);
    buttonJson.addEventListener("click", handlerButtonJson);

    async function handlerButton(): Promise<void> { 

        let formData: FormData = new FormData(document.forms[0]);
        let url: string = "https://localhost:8001";
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "/html" + "?" + query.toString();
    
        let datenServer: Response = await fetch(url);
        let datenString: string = await datenServer.text();

        let paragraph: HTMLElement = document.createElement("p");
        paragraph.innerHTML = datenString;
        document.body.appendChild(paragraph);
        
    }

    async function handlerButtonJson(): Promise<void> {

        let formData: FormData = new FormData(document.forms[0]);
        let url: string = "https://sosegis2020.herokuapp.com";
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "/json"  + "?" + query.toString();
    
        let jsonDatei: Response = await fetch(url);

        console.log( await (jsonDatei.json()));
    }

}