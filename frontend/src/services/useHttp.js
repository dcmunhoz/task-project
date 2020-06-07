import axios from 'axios';
import { useDispatch } from 'react-redux';
import auth from './auth';

const useHttp = () => {
    const http = axios.create({
        baseURL: "http://localhost/api"
    });
    const dispatch = useDispatch();

    async function httpRequest(method, url, params = {}, config = {}, delayEffect){

        // dispatch({
        //     type:"SHOW_LOADING_SCREEN"
        // });

        const token = {
            headers:{
                Authorization: `Bearer ${auth.getToken()}`
            }
        };

        const defaultConfig = { ...token, ...config };

        let response;

        switch(method){
            case "POST":
                response = await http.post(url, params, defaultConfig);
            break;
            case "PUT":
                response = await http.put(url, params, defaultConfig);
            break;
            case "DELETE":
                response = await http.delete(url, defaultConfig);
            break;
            case "GET":
                response = await http.get(url, defaultConfig);
        }

        // dispatch({
        //     type:"HIDE_LOADING_SCREEN"
        // });

        const { data } = response;
    
        if (data.error && data.type === "sys") {
    
            console.error(data.error);
            dispatch({
                type: "SHOW_MODAL_MESSAGE",
                payload: {
                    title: "Erro Interno",
                    message: "Oppps...\n \n Parece que houve um erro interno, contate um administrador para verificar o problema."
                }
            });;
            
            return false;
        }
        
        return response;    
    }

    return httpRequest;

}

export default useHttp;