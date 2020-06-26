import React from 'react';

import Input from '../../../../components/Input';

const Sidebar = () => {
    return(
        <div className="sidebar-filters-inner">
            <header className="sidebar-header">
                <Input 
                    icon="FaSearch"
                />
                <span>
                    Digite para pesquisar por um ID ou titulo de tarefa.
                </span>
            </header>

            <section className="user-tasks-filters">

                <ul>
                    <li>
                        <div>
                            <img src="" alt=""/> a
                        </div>
                    </li>
                </ul>

            </section>


        </div>
    )
}

export default Sidebar;