import axios from 'axios';
import { useDispatch } from 'react-redux';

const useHttp = () => {
    const http = axios.create({
        baseURL: "http://localhost"
    });
    const dispatch = useDispatch();


    async function httpRequest(method, url, params = {}, config = {}, delayEffect){

        dispatch({
            type:"SHOW_LOADING_SCREEN"
        });

        let response;
        
        switch(method){
            case "POST":
                response = await http.post(url, params, config);
            break;
            case "GET":
                response = await http.get(url, params, config);
        }

        dispatch({
            type:"HIDE_LOADING_SCREEN"
        });

        const { data } = response;
    
        if (data.error && data.error.type === "sys") {
    
            console.error(data.error);
            alert("Oppps...\n Parece que houve um erro interno, contate um administrador");
            
        }
        
        return response;    
    }

    return httpRequest;

}

export default useHttp;