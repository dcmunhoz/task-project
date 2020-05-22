import React,{ useState } from 'react';

import Container from './../../components/Container';
import Input from './../../components/Input';
import Button from './../../components/Button';

import './style.css';

import httpRequest from './../../http';

const Login = () => {
    let [username, setUser] = useState("");
    let [password, setPassword] = useState("");

    async function handleLogin(){

        let response = await httpRequest("POST", "/login", {
            username,
            password
        })          
        
        if (!response){
            console.log("não autorizado");
            return;
        }

        console.log("autorizado")

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