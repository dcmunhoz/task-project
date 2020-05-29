import React from 'react';

import './style.css';

const Content = ({sidebarFiltersComponent: Sidebar, children}) => {
    return(
        <div className="content-container">
            <aside className="sidebar-filters">
                <Sidebar />
            </aside>

            <div className="content">
                { children }
            </div>
        </div>
    );
}

export default Content;