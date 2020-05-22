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

    let { success } = response.data;

    if (success) {
        return response.data;
    } else {
        alert("opppps " + response.data.payload);
        return false;
    }
}

export default httpRequest;