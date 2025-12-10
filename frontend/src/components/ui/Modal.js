// src/components/ui/Modal.js

import React from "react";

const Modal = ({ open, onClose, children }) => {
    if (!open) return null;
    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md relative animate-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
        {children}
        </div>
    </div>
    );
};

export default Modal;
