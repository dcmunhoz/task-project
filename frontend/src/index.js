import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Button from './components/Button';

ReactDOM.render(
  <div>
    <header>
      <h1>Pagina teste para bootstraping</h1>
      <p>Realizando os primeiros ajustes do front</p>
    </header>

    <div className="container">
      <Button icon="FaPlus"/>
      <Button> Botão Neutro </Button>
      <Button color="green" size="sm" icon="FaUser"  > Botão Verde </Button>
      <Button color="blue" size="md" icon="FaTable"> Botão Azul </Button>
      <Button color="red" size="lg" icon="FaSearch"> Botão Vermelho </Button>
      <Button color="yellow" size="xlg" icon="FaUsers"> Botão Amarelo </Button>
    </div>
  </div>
  ,
  document.getElementById('root')
);
