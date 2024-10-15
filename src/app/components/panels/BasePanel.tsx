import { ReactNode } from "react";

export default function BasePanel({ className, children }: { className?: string, children?: ReactNode }) {
    return (
        <div className={`flex-initial bg-gray-700 border border-gray-600 px-4 py-2 rounded-lg shadow-lg ${className}`}>
            {children}
        </div>
    );
}