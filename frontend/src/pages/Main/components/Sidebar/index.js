import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from './../../../../components/Icon';

import './style.css'

const Sidebar = ({screens}) => {
    const [closed, setClosed] = useState(false);
    const [toggleIcon, setToggle] = useState('FaAngleDoubleLeft');

    useEffect(() => {

        setToggle((closed) ? "FaBars" : 'FaAngleDoubleLeft')

    },[closed])

    function handleToggleSidebar(){ 
        setClosed((closed) ? false : true);
    }

    return(
        <aside className={`sidebar ${(closed) ? 'closed' : ''}`}>
            <header className="toggler" >
                <div
                    onClick={handleToggleSidebar}
                >
                    <Icon 
                        iconName={toggleIcon}
                        
                    />
                </div>
            </header>
            <div className="profile-info">
                <div className="user-avatar">
                    <img src="https://via.placeholder.com/1920" alt=""/>
                </div>
                <div className="user-name">
                    Daniel Munhoz
                </div>
            </div>

            <div className="menu-items">
                <nav>
                    <ul>
                        { screens.map((screen, i)=>(
                            <li>
                                <Link to={screen.path}> 
                                    <Icon iconName={screen.icon} /> <span className="screen-title">{screen.title}</span>
                                </Link>
                            </li>
                        )) }
                    </ul>
                </nav>                    
            </div>  

            <footer className="sidebar-footer">
                <a href="">
                    <Icon iconName="FaCog" /> <span class="footer-title">Configurações</span>                                 
                </a>
            </footer>

        </aside>
    )
}

export default Sidebar;