import React from "react";

export function Modal({ open, onClose, children }) {
    if (!open) return null
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
            <div className="flex flex-col absolute justify-center items-center bg-white rounded-2xl px-24 py-10 text-black shadow-lg z-10">
                <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
                >
                <img src="/assets/close_icon.svg" className="w-6"></img>
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;