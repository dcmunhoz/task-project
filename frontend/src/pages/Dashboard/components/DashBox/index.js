import React from 'react';

import './style.css';

const DashBox = ({children, title}) => {
    return(
        <div className="dashboard-box">
            {(title) ? (
                <header>
                    <h1>
                        {title}
                    </h1>
                </header>
            ) : null}
            <section
                className="dashboard-box-content"
            >
                {children}
            </section>
 
        </div>
    );
}

export default DashBox;