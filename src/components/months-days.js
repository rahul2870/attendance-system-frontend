import React, { useState, useEffect } from 'react';

const setCurrentMonthYear = (setter) => {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    setter(formattedDate);
}
const getDatesInMonth = (currentDate) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();

    const datesInMonth = [];

    for (let day = 1; day <= lastDay; day++) {
        const date = new Date(year, month, day);
        const optionsDay = { weekday: 'long' };
        const optionsDate = { month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDay = date.toLocaleDateString('en-US', optionsDay);
        const formattedDate = date.toLocaleDateString('en-US', optionsDate);

        datesInMonth.push({ day: `${day} ${formattedDay}`, date: formattedDate });
    }

    return datesInMonth;
};
function MonthDates({ attendanceCounts, opnedDay, changeMonth }) {
    const [monthDates, setMonthDates] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(null);

    const prevMonth = () => {
        const previousMonth = new Date(currentDate);
        previousMonth.setMonth(currentDate.getMonth() - 1);
        setCurrentDate(previousMonth);
        const formattedMonth = previousMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        setCurrentMonth(formattedMonth);
    };

    const nextMonth = () => {
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(currentDate.getMonth() + 1);
        setCurrentDate(nextMonth);
        const formattedMonth = nextMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        setCurrentMonth(formattedMonth);
    };

    useEffect(() => {
        const dates = getDatesInMonth(currentDate);
        setMonthDates(dates);

        setCurrentMonthYear(setCurrentMonth);
    }, [opnedDay?.date]);

    return (
        <div>


            <div className='flex align-middle justify-between my-8'>
                <button className='font-bold  text-slate-900  py-2 px-5 bg-slate-100 shadow-md' onClick={prevMonth}>Previous Month</button>
                {currentMonth && <h2 key={currentMonth} className='font-md text-2xl text-slate-700  py-2 px-5 bg-slate-300'>{currentMonth}</h2>}
                <button className='font-bold  text-slate-900  py-2 px-5 bg-slate-100 shadow-md' onClick={nextMonth}>Next Month</button>
            </div>
            <ul className='grid grid-cols-7 gap-3'>
                {monthDates.map((date, index) => {
                    const findEmp = attendanceCounts?.find(i => i?.date === date?.date) || false;
                    return (
                        <li
                            onClick={() => { opnedDay(date) }}
                            className='bg-slate-200 p-2 border-2 border-slate-500 cursor-pointer hover:bg-slate-800 hover:text-slate-100'
                            key={index}>
                            {date?.day}
                            <p className='text-slate-600 font-semibold text-sm mt-2'>Total Present : {findEmp ? findEmp?.totalPresents : 0}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default MonthDates;
