import React, { useEffect } from 'react';

import Content from './../../components/Content';
import useHttp from './../../services/useHttp';

import './style.css';

const Tasks = () => {
    const httpRequest = useHttp();

    return(
        <Content
            sidebarFiltersComponent={()=>(
                <h1>Side</h1>
            )}
        >
            <div className="task-list-content">
                <header>
                    <h1>Titulo Pagina Tarefa</h1>
                </header>
                <div className="task-list">
                    <ul>
                        <li>
                            <div className="task-box">
                                Tutilo padrão de uma tarefa
                            </div>
                        </li>
                        <li>
                            <div className="task-box">
                                Tutilo padrão de uma tarefa
                            </div>
                        </li>
                        <li>
                            <div className="task-box">
                                Tutilo padrão de uma tarefa
                            </div>
                        </li>
                    </ul>

                </div>
            </div>
        </Content>
    );
}

export default Tasks;