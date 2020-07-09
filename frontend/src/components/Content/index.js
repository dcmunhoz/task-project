import React from 'react';

import './style.css';

const Content = ({sidebarFiltersComponent: Sidebar, children, sidebarValue, sidebarOnChange}) => {
    return(
        <div className="content-container">
            <aside className="sidebar-filters">
                <Sidebar 
                    value={sidebarValue}
                    onChange={sidebarOnChange}
                />
            </aside>

            <div className="content">
                { children }
            </div>
        </div>
    );
}

export default Content;