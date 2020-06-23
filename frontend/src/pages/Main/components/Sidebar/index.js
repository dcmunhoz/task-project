import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Icon from './../../../../components/Icon';


import './style.css'

const Sidebar = ({screens}) => {
    const { fullname } = useSelector(store => store.user.authenticatedUser);

    const [closed, setClosed] = useState(true);
    const [userName, setUserName] = useState("");
    const [toggleIcon, setToggle] = useState('FaAngleDoubleLeft');
    const [activeScreen, setActiveScreen] = useState('');
    
    const history = useHistory();
    const location = useLocation();

    useEffect(()=>{
        screens.forEach((screen)=>{
            
            if (screen.default) {
                setActiveScreen(screen.title)
                history.push(screen.path);
            }
        });
    }, [])

    useEffect(()=>{
        if (location.pathname !== "/") {
            const reloadScreen = screens.find(search=>search.path === location.pathname);
            if (reloadScreen){
                setActiveScreen(reloadScreen.title);
                history.push(location.pathname)
            }
        }
    },[]);

    useEffect(()=>{

        let arrayName = fullname.split(" ");

        let firstName = arrayName[0];
        let lastName = arrayName[arrayName.length - 1];

        setUserName(firstName + " " + lastName);
        
    }, [fullname]);

    useEffect(() => {

        setToggle((closed) ? "FaAngleDoubleRight" : 'FaAngleDoubleLeft')

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
                    <img src="http://localhost/public/assets/avatars/example_avatar.jpg" alt="Avatar"/>
                </div>
                <div className="user-name">
                    { userName }
                </div>
            </div>

            <div className="menu-items">
                <nav>
                    <ul>
                        { screens.map((screen, i)=>{
                            return(
                                <li key={i}>
                                    <Link 
                                        to={screen.path} 
                                        onClick={()=>{setActiveScreen(screen.title)}}
                                        className={(activeScreen === screen.title) ? 'active' : ''}
                                    > 
                                        <Icon iconName={screen.icon} /> <span className="screen-title">{screen.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>                    
            </div>  

            <footer className="sidebar-footer">
                <a href="/">
                    <Icon iconName="FaCog" /> <span className="footer-title">Configurações</span>                                 
                </a>
            </footer>

        </aside>
    )
}

export default Sidebar;