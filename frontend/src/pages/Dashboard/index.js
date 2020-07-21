import React from 'react';

import Container from './../../components/Container';
import DashBox from './components/DashBox';

import './style.css';

const Dashboard = () => {
    return(
        <Container>
            <div className="dashboard-container">
                <section className="left-dash">
                    <DashBox>
                        <h1>
                            Bem vindo Daniel
                        </h1>
                    </DashBox>
                </section>

                <section className="right-dash">
                    bb
                </section>
                
            </div>
        </Container>
    );
}

export default Dashboard;