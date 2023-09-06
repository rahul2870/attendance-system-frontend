import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useModal } from '../components/modal';
import MonthDatesCMP from '../components/months-days'
import SingleDayPresents from '../components/SingleDayPresents';
import { SERVERURI } from '../consts';


const fetchUsersList = async (setter, monthAndYear) => {
    try {
        const { data } = await axios.post(`${SERVERURI}/api/users/get-attendance-list`, { monthAndYear });
        if (data?.success) {
            setter(data?.data)
        } else {
            console.log("error : ", data)
        }
    } catch (error) {
        console.log("error : ", error)
    }
}

const setCurrentMonthYear = () => {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    return (formattedDate);
}


export default function AttendancePage() {

    const [attendanceCounts, setAttendanceCounts] = useState(null);
    const [openedDay, setOpenedDay] = useState(null)
    const {
        openModal,
        closeModal,
        Modal
    } = useModal();

    useEffect(() => {
        const monthAndYear = setCurrentMonthYear();
        console.log("month and year ::: ", monthAndYear)
        fetchUsersList(setAttendanceCounts, monthAndYear)
    }, []);

    return <>
        <Modal>
            <SingleDayPresents openedDay={openedDay} />
            <div className='flex justify-end'>
                <button className="font-extrabold mt-4" onClick={closeModal}>Close</button>
            </div>
        </Modal>
        <div className='m-8 mb-32'>
            <h1 className='font-md text-4xl text-slate-700 text-center'>All Attendance</h1>
            <MonthDatesCMP
                attendanceCounts={attendanceCounts}
                opnedDay={details => {
                    setOpenedDay(details);
                    openModal()
                }}
                changeMonth={month => {
                    console.log("month and year ::: ", month)

                    // fetchUsersList(setAttendanceCounts, month)
                }}
            />
        </div>
    </>
}
