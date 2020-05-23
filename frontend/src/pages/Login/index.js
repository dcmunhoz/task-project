import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Container from './../../components/Container';
import Input from './../../components/Input';
import Button from './../../components/Button';

import httpRequest from '../../services/http';
import auth from './../../services/auth';

import './style.css';

const Login = () => {
    let [username, setUser] = useState("");
    let [password, setPassword] = useState("");
    let dispatch = useDispatch();
    let history = useHistory();


    async function handleLogin(){

        let response = await httpRequest("POST", "/login", {
            username,
            password
        })          
        
        const { data } = response;

        if (data.error) {
            if (data.error.type !== "sys")
            dispatch({
                type: "SHOW_MODAL_MESSAGE",
                payload: {
                    message: data.error
                }
            });;
            return
        }

        await auth.authenticate(data);

        history.push("/");    

    }

    return (
        <Container>
            
            <div className="loginContainer">
                
                <div className="login-box">
                    <header>
                        <p>
                            Project Pandora
                        </p>
                    </header>
                    <section className="input-box">
                        <Input 
                            placeholder="Entre com seu usuário."
                            icon="FaUser"
                            value={username}
                            onChange={(e)=> {setUser(e.target.value)}}
                        />
                        <Input 
                            placeholder="Agora com sua senha."
                            icon="FaKey"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                        <p>Esqueceu sua senha? <a href="">Clique Aqui !</a></p>
                    </section>

                    <section className="buttons-box">
                        <Button
                            color="green"
                            icon="FaSignInAlt"
                            onClick={handleLogin}
                        >
                            Entrar
                        </Button>
                    </section>
                </div>

            </div>

        </Container>
    );    
}

export default Login;