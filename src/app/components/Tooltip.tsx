import { ReactNode } from "react";

const Tooltip = ({ children, text }: { children: ReactNode, text: string }) => {
    return (
        <div className="relative group">
            {children}
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 hidden group-hover:block bg-gray-950 text-white text-xs rounded py-1 px-2 z-10 min-w-60">
                {text}
            </div>
        </div>
    );
}

export default Tooltip;