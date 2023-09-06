import { Route, Routes } from "react-router-dom";

import NavbarCMP from "./components/navbar";
// pages 
import AllUsers from './pages/all-users';
import AttendancePage from "./pages/attendance";

// toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App() {

    return <>
        <ToastContainer />
        <NavbarCMP />
        <Routes>
            <Route path="/" element={<AllUsers />} />
            <Route path="/attendance" element={<AttendancePage />} />

        </Routes>

        <div className="text-center py-10">
            <h1 className="text-lg">Hi, Quick Connect</h1>
            <div className="flex gap-10 justify-center mt-4 font-bold">
                <p>+91-8448443891</p>
                <p>+91-9310964293</p>
            </div>
        </div>
    </>
}