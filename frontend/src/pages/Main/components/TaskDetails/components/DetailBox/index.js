import React from 'react';

import './style.css';

const DetailtBox = ({label, customClass, children}) => {
    return(
        <div className={"task-block " + customClass}>
            <header>
                <span>{label}</span>
            </header>

            <section className="block-content">
                {children}
            </section>
        </div>
    );
}

export default DetailtBox;