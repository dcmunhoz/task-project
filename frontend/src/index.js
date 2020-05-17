import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Button from './components/Button';
import Input from './components/Input';

ReactDOM.render(
  <div>
    <header>
      <h1>Pagina teste para bootstraping</h1>
      <p>Realizando os primeiros ajustes do front</p>
    </header>

    <div className="section">
      <h1>Botões</h1>
      <Button icon="FaPlus"/>
      <Button> Botão Neutro </Button>
      <Button color="green" size="sm" icon="FaUser"  > Botão Verde </Button>
      <Button color="blue" size="md" icon="FaTable"> Botão Azul </Button>
      <Button color="red" size="lg" icon="FaSearch"> Botão Vermelho </Button>
      <Button color="yellow" size="xlg" icon="FaCheckCircle"> Botão Amarelo </Button>
    </div>

    <div className="section">
      <h1>Links</h1>
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
      <a href="#">Link 4</a>
    </div>

    <div className="section">
      <h1>Input</h1>
      <Input
        placeholder="Exemplo de Place"
        icon="FaUser"
        
      />
    </div>
  </div>
  ,
  document.getElementById('root')
);
