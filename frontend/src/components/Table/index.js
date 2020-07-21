import React from 'react';

import './style.css';

const Table = ({header, data,  rowClick}) =>{
    return(
        <table className="table-container">
            {(header) ? (
                <thead>
                    <tr>
                        {header.map((item, i)=>(
                            <th key={i}>{item}</th>
                        ))}
                    </tr>
                </thead>
            ) : null}
            <tbody>
                {data.map(item=>(
                    <tr key={item.id} data-id={item.id} onClick={rowClick}>
                        {Object.entries(item).map((data,i)=>(
                            <td key={i}>{data[1]}</td>
                        ))}                        
                    </tr>
                ))}
            </tbody>
        </table>

    );
}

export default Table;