import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { useModal } from '../components/modal';
import { SERVERURI } from '../consts';

const fetchUsersList = async (setUsersList) => {
    try {
        const { data } = await axios.get(`${SERVERURI}/api/users/get-users`);
        if (data?.success) {
            setUsersList(data?.data)
        } else {
            setUsersList(null)
        }
    } catch (error) {
        setUsersList(null)
    }
}

const setFormmatedDate = (setter, toSetDate) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const date = !toSetDate ? new Date() : new Date(toSetDate);
    setter(date.toLocaleDateString('en-US', options));
}
export default function AllUsers() {
    const [userList, setUsersList] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const {
        openModal,
        closeModal,
        Modal
    } = useModal();
    const [makeAttendTo, setMakeAttendTo] = useState(null)

    useEffect(() => {
        fetchUsersList(setUsersList);
        setFormmatedDate(setSelectedDate);
    }, []);

    const openUserModal = (employee) => {
        setMakeAttendTo({
            ...employee,
            selectedDate
        })
        openModal();
    }

    const makeAttendanceHandler = async () => {
        try {
            const currentDate = new Date(makeAttendTo?.selectedDate);
            const monthYear = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

            const { data } = await axios.post(`${SERVERURI}/api/users/make-attendance`, {
                date: makeAttendTo?.selectedDate,
                monthYear,
                user: {
                    employeeId: makeAttendTo?.employeeId,
                    name: makeAttendTo?.name,
                    phoneNumber: makeAttendTo?.phoneNumber
                }
            });
            if (data?.success) {
                toast(data.message)
            } else {
                toast(data.message)
            }
        } catch (error) {
            toast(error.message)
        }
    }

    return <>
        <ToastContainer />
        <Modal>
            <div>
                <ShowTray label="Let Say Today Is" value={makeAttendTo?.selectedDate} />
                <ShowTray label="Employee Id" value={makeAttendTo?.employeeId} />
                <ShowTray label="Name" value={makeAttendTo?.name} />
                <ShowTray label="Phone Number" value={makeAttendTo?.phoneNumber} />
            </div>
            <div className='flex justify-end gap-4 mt-4'>
                <button className='text-blue-800 font-bold' onClick={makeAttendanceHandler}>Make Attendance</button>
                <button onClick={closeModal}>Close</button>
            </div>
        </Modal>
        <div className='m-12'>
            <div className='flex align-middle justify-between mb-7'>
                <h1 className='font-medium text-3xl '>All Employees</h1>
                <div>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => {
                            setFormmatedDate(setSelectedDate, e.target.value);
                        }}
                    />
                    {selectedDate && (
                        <>Selected Date: {selectedDate}</>
                    )}
                </div>
            </div>
            {userList && userList?.map((employee, idx) => {

                return <div
                    className='flex align-middle justify-between border-[1px] mt-1 px-8 py-2 border-slate-300'
                    key={employee?.employeeId || idx}>
                    <p className='flex-[1]'>{idx + 1}.)</p>
                    <p className='flex-[1]'>{employee?.name}</p>
                    <p className='flex-[1]'>{employee?.phoneNumber}</p>
                    <p className='flex-[1]'>Log In As : <span onClick={() => { openUserModal(employee) }} className='underline text-blue-800 cursor-pointer'>{employee?.name}</span></p>
                </div>
            })}
        </div>
    </>
}

const ShowTray = ({ label, value }) => {
    return <div className='flex gap-4 min-w-[500px]'>
        <p className='flex-[1] font-bold text-left'>{label}</p>
        <p className='flex-[2] text-left'>: {value}</p>
    </div>
}