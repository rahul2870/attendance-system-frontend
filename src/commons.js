
import { useState, useEffect } from 'react';


// export const SERVER_URI = "http://localhost:8000"
export const SERVER_URI = "https://form-validation-server.vercel.app"
export const useAccessToken = () => {
    const [accessTokenData, setAccessTokenData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAccessToken = async () => {
            const url = "https://www.universal-tutorial.com/api/getaccesstoken";
            const apiToken = "AuXnFjES43NqbdODZoc1anLtpO9op_9HsA7hqU56HJoxlbbNrMsUAzmsp6cqoZ0HhWQ";
            const userEmail = "abc@gmail.com";

            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "api-token": apiToken,
                        "user-email": userEmail
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch access token');
                }

                const data = await response.json();
                setAccessTokenData(data.auth_token);
                setError(null);
            } catch (error) {
                // console.error(error);
                setError('Failed to fetch access token');
                setAccessTokenData(null);
            }
        };

        getAccessToken();
    }, []);

    return [accessTokenData, error];
};


export const getCountries = async (tken) => {
    const url = "https://www.universal-tutorial.com/api/countries/";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJtdmdhZGFnaUBnbWFpbC5jb20ifSwiZXhwIjoxNTY2MjM0ODU0fQ.nMWPN38zptwwDKAo11bFyjhCRuzNhZc6NqqCaYJVxP0";

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch countries');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        // console.error(error);
        return null;
    }
};


export const InputField = ({ label, name, placeholder, errors }) => {

    return <>
        <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
                {label}
            </label>
            <input
                name={name}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={name}
                type="text"
                placeholder={placeholder}
            />
        </div>
        {errors?.[name] && <p className="text-red-700 capitalize">{errors?.[name]}</p>}
    </>
};



export const InputFieldDisabled = ({ label, name, value }) => {
    return (
        <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
                {label}
            </label>
            <input
                disabled
                name={name}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={name}
                value={value || ""}
                type="text"
            />
        </div>
    );
};

export const DropField = ({ label, name, placeholder, options, errors }) => {
    return <>
        <div className="mt-4">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                {label}
            </label>
            <div class="relative">
                <select name={name} placeholder={placeholder} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    {options?.map(_ => <option>{_}</option>)}
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
        </div>
        {errors?.[name] && <p className="text-red-700 capitalize">{errors?.[name]}</p>}
    </>
}

export const RadioInput = ({ label, name, options, errors }) => {
    return <>
        <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            {options.map((option) => (
                <label key={option} className="inline-flex items-center mt-1 mx-2">
                    <input
                        type="radio"
                        name={name}
                        value={option}
                        className="form-radio h-5 w-5 text-indigo-600"
                    />
                    <span className="ml-2">{option}</span>
                </label>
            ))}
        </div>
        {errors?.[name] && <p className="text-red-700 capitalize">{errors?.[name]}</p>}
    </>
};


export const DatePickerCMP = ({ label, name, errors }) => {
    return <>
        <div class="relative mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none top-7">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
            </div>
            <input name={name} datepicker-autohide type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
        </div>
        {errors?.[name] && <p className="text-red-700 capitalize">{errors?.[name]}</p>}
    </>
}

export function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const now = new Date();

    // Check if the provided date of birth is valid
    if (isNaN(dob.getTime())) {
        throw new Error("Invalid date of birth");
    }

    let age = now.getFullYear() - dob.getFullYear();
    const monthDiff = now.getMonth() - dob.getMonth();

    // If the current month is less than the birth month, or if the current month
    // is equal to the birth month but the current day is less than the birth day,
    // then the age should be decreased by 1 as the birthday hasn't occurred yet.
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
        age--;
    }

    return age;
}