import React,{ useState } from 'react';

import Container from './../../components/Container';
import Input from './../../components/Input';
import Button from './../../components/Button';

import './style.css';

const Login = () => {
    let [user, setUser] = useState("");
    let [password, setPassword] = useState("");



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
                            value={user}
                            onChange={(e)=> {setUser(e.value)}}
                        />
                        <Input 
                            placeholder="Agora com sua senha."
                            icon="FaKey"
                            value={password}
                            onChange={(e) => {setPassword(e.value)}}
                        />
                        <p>Esqueceu sua senha? <a href="">Clique Aqui !</a></p>
                    </section>

                    <section className="buttons-box">
                        <Button
                            color="green"
                            icon="FaSignInAlt"
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