import React from 'react';

import Container from './../../components/Container';
import DashBox from './components/DashBox';
import Icon from './../../components/Icon';

import './style.css';

const Dashboard = () => {
    return(
        <Container>
            <div className="dashboard-container">
                <section className="left-dash">
                    <div className="dash-row">
                        <DashBox>
                            <h1 className="welcome-message">
                                Bem vindo de volta Daniel =D
                            </h1>

                            <p className="welcome-submessage">
                                Você tem um total de <strong>5</strong> tarefas para finalizar hoje  
                            </p>

                        </DashBox>
                    </div>

                    <div className="dash-row">
                        <div className="inner-row-container">
                            <DashBox
                                title="Hoje"
                            >
                                <div>
                                    <Icon 
                                        iconName="FaRegArrowAltCircleUp"
                                        className="dashboard-open-arrow"
                                    />

                                    5 Tarefas Abertas
                                </div>

                                <div>
                                    <Icon 
                                        iconName="FaRegArrowAltCircleDown"
                                        className="dashboard-closed-arrow"
                                    />
                                    10 Tarefas Finalizadas
                                </div>

                            </DashBox>
                        </div>

                        <div className="inner-row-container">
                            {/* <DashBox
                                title="Alguma coisa"
                            >
                                
                            </DashBox> */}
                        </div>
                    </div>
                </section>

                <section className="right-dash">
                    <div className="dash-row">
                        <DashBox 
                            title="Sua performance "
                        >

                        </DashBox>
                    </div>

                    <div className="dash-row">
                        <DashBox 
                            title="Histórico de Tarefas"
                        >

                        </DashBox>
                    </div>
                </section>
                
            </div>
        </Container>
    );
}

export default Dashboard;