import axios from 'axios';

const http = axios.create({
    baseURL: "http://localhost"
});

async function httpRequest(method, url, params = {}, config = {}){

    let response;

    switch(method){
        case "POST":
            response = await http.post(url, params, config);
        break;
        case "GET":
            response = await http.get(url, params, config);
    }

    const { data } = response;

    if (data.error && data.error.type === "sys") {

        console.error(data.error);
        alert("Oppps...\n Parece que houve um erro interno, contate um administrador");
        
    }
    
    return response;    
}

export default httpRequest;