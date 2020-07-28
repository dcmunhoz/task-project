import React, { useEffect, useState  } from 'react';
import { useSelector } from 'react-redux';

import Container from './../../components/Container';
import DashBox from './components/DashBox';
import Icon from './../../components/Icon';
import useHttp from './../../services/useHttp';

import './style.css';

const Dashboard = () => {
    const { authenticatedUser } = useSelector(store=>store.user);

    const [userName, setUserName] = useState(" ");
    const [userTaskQtt, setUserTaskQtt] = useState(0);
    const [dailyCount, setDailyCount] = useState({});

    const httpRequest = useHttp();

    useEffect(()=>{

        loadUserTaskQtt();
        loadTodayDetails();

    }, []);

    useEffect(()=>{
        
        const nameArr = authenticatedUser.fullname.split(' ');    

        setUserName(nameArr[0] + ' ' + nameArr[1]);

    }, [authenticatedUser]);

    async function loadUserTaskQtt(){

        const response = await httpRequest("GET", '/dashboard/user-tasks');

        if (!response) return false;

        const { data } = response;

        setUserTaskQtt(data.tasks_count)

    }

    async function loadTodayDetails(){
        const response = await httpRequest("GET", "/dashboard/daily-tasks");

        if (!response) return false;
        
        const { data } = response;
        setDailyCount(data)
    }

    return(
        <Container>
            <div className="dashboard-container">
                <section className="left-dash">
                    <div className="dash-row">
                        <DashBox>
                            <h1 className="welcome-message">
                                Bem vindo de volta {userName} =D
                            </h1>

                            <p className="welcome-submessage">
                                Você tem um total de <strong> {userTaskQtt} </strong> tarefas para finalizar hoje  
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

                                    {dailyCount.oppened || 0} Tarefas Abertas
                                </div>

                                <div>
                                    <Icon 
                                        iconName="FaRegArrowAltCircleDown"
                                        className="dashboard-closed-arrow"
                                    />
                                    {dailyCount.closed || 0} Tarefas Finalizadas
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