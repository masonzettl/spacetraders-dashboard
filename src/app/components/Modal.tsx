import { XMarkIcon } from "@heroicons/react/16/solid";
import { MouseEventHandler, ReactNode } from "react";

export default function Modal({ open, onClose, children }: { open: boolean, onClose: MouseEventHandler, children: ReactNode }) {
    return (
        <div onClick={onClose} className={`
            fixed inset-0 w-screen h-screen flex justify-center items-center transition-colors
            ${open ? "visible bg-black/20" : "invisible"}
        `}>
            <div onClick={(e) => e.stopPropagation()} className={`
                bg-gray-700 border-gray-600 border rounded-xl shadow p-6 transition-all
                ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
            `}>
                <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-gray-700 hover:bg-gray-800 hover:text-red-400">
                    <XMarkIcon className="size-6" />
                </button>
                {children}
            </div>
        </div>
    )
}