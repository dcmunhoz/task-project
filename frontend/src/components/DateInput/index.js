import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import Icon from '../Icon';

import './style.css';
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({value, onChange}) => {
    const [startDate, setStartDate] = useState(null);

    useEffect(()=>{
        if (value) {

            const dateFormated = `${value.split('/')[1]}/${value.split('/')[0]}/${value.split('/')[2]}`
            const date = new Date(dateFormated);
            setStartDate(date);

        }
    },[value]);

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
                onChange={onChange}
                selected={startDate}
            />
        </div>
        
        
    )
}

export default DateInput;