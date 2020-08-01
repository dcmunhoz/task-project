import React, { useEffect, useState  } from 'react';
import { useSelector } from 'react-redux';
import { Chart, Dataset } from 'react-rainbow-components';

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

    //Pie Chart
    const [pieLabels, setPieLabels] = useState([""]);
    const [pieData, setPieData] = useState([0]);

    // Task History
    const [historyLabels, setHistoryLabels] = useState([]);
    const [historyData, setHistoryData] = useState([]);

    // User Performace
    const [userPerformaceLabels, setUserPerformaceLabels] = useState([]);
    const [userPerformaceAssigned, setUserPerformaceAssigned] = useState([]);
    const [userPerformaceConcluded, setUserPerformaceConcluded] = useState([]);

    const httpRequest = useHttp();

    useEffect(()=>{

        loadUserTaskQtt();
        loadTodayDetails();
        loadSituationsDashboard();
        loadTaskHistoryDashboars();
        loadUserPerformace();

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

    async function loadSituationsDashboard(){

        const response = await httpRequest("GET", "/dashboard/situations");
        if (!response) return false;
        const { data } = response;

        const labels = [];
        const count = [];
        data.map(row=>{
            labels.push(row.situation.toUpperCase());
            count.push(parseInt(row.count));
        });
        setPieLabels(labels);
        setPieData(count);
    }

    async function loadTaskHistoryDashboars(){

        const response = await httpRequest("GET", "/dashboard/task-history");
        if (!response) return false;
        const { data } = response;
        
        const periods = [];
        const values = [];
        data.map(row=>{
            periods.push(row.period);
            values.push(parseInt(row.count));
        });

        setHistoryLabels(periods);
        setHistoryData(values);

    }

    async function loadUserPerformace(){

        const response = await httpRequest("GET", '/dashboard/user-performace');
        if (!response) return false;
        
        const { data } = response;

        const months = Object.keys(data);
        const assigned = [];
        const concluded = [];

        months.forEach(month=>{
            assigned.push(data[month].assigned);
            concluded.push(data[month].concluded);
        })

        setUserPerformaceLabels(months);
        setUserPerformaceAssigned(assigned);
        setUserPerformaceConcluded(concluded);

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
                            <DashBox
                                title="Situações"
                            >
                                <Chart
                                labels={pieLabels}
                                type="pie"
                                >
                                    <Dataset
                                        title="Dataset 1"
                                        values={pieData}
                                        backgroundColor={["#00ADB5", "#e99920", "#e9d520", "#005792", "#FF1E56"]}
                                        borderColor={["#00ADB5", "#e99920", "#e9d520", "#005792", "#FF1E56"]}
                                    />
                                </Chart>
                            </DashBox>
                        </div>
                    </div>

                    <div className="dash-row">
                        <DashBox 
                            title="Histórico de Tarefas"
                        >
                            <Chart
                                labels={historyLabels}
                                type="bar"
                            >
                                <Dataset
                                    title="Tarefas Abertas"
                                    values={historyData}
                                    backgroundColor="#1de9b6"
                                    borderColor="#1de9b6"
                                />
                            </Chart>
                        </DashBox>
                    </div>
                    
                </section>

                <section className="right-dash">
                    <div className="dash-row">
                        <DashBox 
                            title="Sua performance "
                        >
                            <Chart
                                labels={userPerformaceLabels}
                                type="line"
                            >
                                <Dataset
                                    title="Concluidas"
                                    values={userPerformaceConcluded}
                                    backgroundColor="#ff1e5680"
                                    borderColor="#FF1E56"
                                    fill={true}
                                />

                                <Dataset
                                    title="Atribuidas"
                                    values={userPerformaceAssigned}
                                    backgroundColor="#01b8f57e"
                                    borderColor="#01b6f5"
                                    fill={true}
                                />
                                
                            </Chart>
                        </DashBox>
                    </div>

                    <div className="dash-row">
                        <DashBox 
                            title="Performace geral"
                        >
                            <Chart
                                labels={['A', 'B', 'C', 'D']}
                                type="line"
                            >
                                <Dataset
                                    title="Dataset 1"
                                    values={[23, 45, 123, 56]}
                                    backgroundColor="#1de9b6"
                                    borderColor="#1de9b6"
                                    fill={true}
                                />
                                <Dataset
                                    title="Dataset 2"
                                    values={[66, 100, 30, 156]}
                                    backgroundColor="#01b6f5"
                                    borderColor="#01b6f5"
                                    fill={true}
                                />
                            </Chart>
                        </DashBox>
                    </div>
                </section>
                
            </div>
        </Container>
    );
}

export default Dashboard;