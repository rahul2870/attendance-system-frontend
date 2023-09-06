import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { SERVERURI } from '../consts';

const fetchSingleDay = async (setter, date) => {
    try {
        const { data } = await axios.post(`${SERVERURI}/api/users/single-day`, { date });
        if (data?.success) {
            setter(data?.data)
        } else {
            console.log("error : ", data)
        }
    } catch (error) {
        console.log("error : ", error)
    }
}

export default function SingleDayPresents({ openedDay }) {
    const [singleDayData, setSingleDayData] = useState(null);
    useEffect(() => {
        fetchSingleDay(setSingleDayData, openedDay?.date)
    }, [])

    const makeHimAbsent = async (user) => {
        try {
            const { data } = await axios.post(`${SERVERURI}/api/users/make-absent`, { user, date: openedDay?.date });
            if (data?.success) {
                toast.success(data?.message);
                fetchSingleDay(setSingleDayData, openedDay?.date)
            } else {
                toast.error(data?.message)
            }
        } catch (error) {
            toast.error("Internet Issue!")
        }
    }

    return (
        <div className='min-w-[70vw]'>
            {singleDayData && <>
                <h3 className='text-left text-lg font-bold mb-7'>{singleDayData?.date}</h3>
                <div className='text-left flex gap-5'>
                    <p className='flex-[1] font-bold'>No.</p>
                    <p className='flex-[4] font-bold'>Employee Id</p>
                    <p className='flex-[3] font-bold'>Name</p>
                    <p className='flex-[5] font-bold'>PhoneNumber</p>
                    <p className='flex-[5] font-bold '>Action</p>
                </div>
                {singleDayData?.presentUsers?.map((user, idx) => {

                    return <div className='text-left flex gap-5'>
                        <p className='flex-[1] '>{idx + 1}.)</p>
                        <p className='flex-[4]'>{user?.employeeId}</p>
                        <p className='flex-[3]'>{user?.name}</p>
                        <p className='flex-[5]'>{user?.phoneNumber}</p>
                        <p onClick={() => { makeHimAbsent(user) }} className='flex-[5] underline text-blue-900 cursor-pointer'>Make Him Absent</p>
                    </div>
                })}
            </>}
        </div>
    )
}
