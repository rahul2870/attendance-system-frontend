import { useState } from "react";

export function useModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const Modal = ({ children }) => {
        if (!isModalOpen) {
            return null;
        }
        return (
            <div className="fixed inset-0 z-[1000]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div onClick={closeModal} className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="fixed top-10 left-10 right-10 bottom-10 inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="bg-white p-4 shadow-xl rounded-lg">{children}</div>
                    </div>
                </div>
            </div>
        );
    };

    return {
        openModal,
        closeModal,
        Modal
    };
}