import { ReactNode } from "react";

export default function BasePanel({ className, title, children }: { className?: string, title?: string, children?: ReactNode }) {
    return (
        <div className={`flex-initial bg-gray-700 border border-gray-600 px-4 py-2 rounded-lg shadow-lg ${className}`}>
            {title ? <h1 className="text-2xl font-bold mb-1">{title}</h1> : null}
            {children}
        </div>
    );
}