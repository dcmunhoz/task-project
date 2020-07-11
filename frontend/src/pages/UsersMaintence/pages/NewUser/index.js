import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


import MaintenceContainer from './../../../../components/MaintenceContainer';
import DetailBox from './../../../../components/DetailBox';
import Input from './../../../../components/Input';
import Select from './../../../../components/Select';
import Button from './../../../../components/Button';

import './style.css';

const NewUser = () => {
    
    const history = useHistory();
    
    let data = [{
        id: 1,
        label: "daniel"
    }]
    
    useEffect(()=>{
        console.log("renderizado");
    }, []);

    function handleCancelCreation(e){
        e.preventDefault();

        history.push("/settings/users");

    }

    return(
        <MaintenceContainer 
            title="Cadastro de novo Usuário"
        >
            <div className="new-user-container">
                <form onSubmit={()=>alert("biririr")} >

                    <div className="double-input-row">
                        <DetailBox 
                            label="Primeiro Nome"
                            customClass="detail-box"
                        >
                            <Input 
                                placeholder="Primeiro nome"
                            />
                        </DetailBox>

                        <DetailBox 
                            label="Segundo Nome"
                            customClass="detail-box"
                        >
                            <Input 
                                placeholder="Segundo nome"
                            />
                        </DetailBox>
                    </div>

                    <div className="input-row">
                        <DetailBox 
                            label="Usuário"
                        >
                            <Input 
                                placeholder="Nome de usuário"    
                            />
                        </DetailBox>
                    </div>

                    <div className="double-input-row">
                        <DetailBox
                            label="Senha"
                            customClass="detail-box"
                        >
                            <Input type="password" placeholder="Digite a senha" />
                        </DetailBox>

                        <DetailBox
                            label="Confirmar Senha"
                            customClass="detail-box"
                        >
                            <Input type="password" placeholder="Confirme a senha" />
                        </DetailBox>
                    </div>  

                    <div className="input-row">
                        <DetailBox 
                            label="E-mail"
                        >
                            <Input 
                                placeholder="Melhor E-mail"    
                                type="email"
                            />
                        </DetailBox>
                    </div>

                    <div className="double-input-row">
                        <DetailBox
                            label="Tipo de Usuário"
                        >
                            <Select
                                data={data}
                            />
                        </DetailBox>

                        <DetailBox
                            label="Situação do usuário"
                        >
                            <Select
                                data={data}
                            />
                        </DetailBox>
                    </div>

                    <div className="input-row">
                        <Button
                            color="green"
                            icon="FaPlus"
                            size="sm"
                        >
                            Salvar
                        </Button>

                        <Button
                            color="red"
                            icon="FaTimes"
                            size="sm"
                            onClick={handleCancelCreation}
                        >
                            Cancelar
                        </Button>
                    </div>

                </form>
            </div>
        </MaintenceContainer>
    );
}

export default NewUser;