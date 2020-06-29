import React from 'react';
import DatePicker from 'react-datepicker';

import Icon from '../Icon';

import './style.css';
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({}) => {
    return(
        <div className="date-input">
            <Icon 
                iconName="FaCalendar"
            />
            <DatePicker 
                placeholderText="Selecione uma data"
                dateFormat="dd/MM/yyyy"
                className="custom-date-picker"
                minDate={new Date()}
            />
        </div>
        
        
    )
}

export default DateInput;