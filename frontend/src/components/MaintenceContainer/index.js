import React from 'react';

import './style.css';

const MaintenceContainer = ({ children, title, subTitle }) => {
    return(
        <div className="maintence-container">
            <header className="maintence-header">
                <h1>
                    {title}
                </h1>
                {(subTitle !== "") ? (
                    <span>
                        {subTitle}
                    </span>
                ) : null}
            </header>
            
            <section className="maintence-section">
                {children}
            </section>            
        </div>
    );
}

export default MaintenceContainer;