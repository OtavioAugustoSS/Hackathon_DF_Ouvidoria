import React, { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
    duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 5000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    const bgColor = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-orange-500',
    }[type];

    const icon = {
        success: 'check_circle',
        error: 'error',
        info: 'info',
        warning: 'warning',
    }[type];

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-10 fade-in duration-300">
            <div className={`${bgColor} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[320px] max-w-md`}>
                <span className="material-symbols-outlined">{icon}</span>
                <p className="flex-1 font-bold text-sm">{message}</p>
                <button
                    onClick={onClose}
                    className="hover:bg-white/20 p-1 rounded-full transition-colors flex items-center justify-center"
                >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
            </div>
        </div>
    );
};

export default Toast;
