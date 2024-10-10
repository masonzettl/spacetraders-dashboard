import { ReactNode } from "react";

type Alignment = 'top' | 'left' | 'right' | 'bottom';

export default function Tooltip({ enabled = true, children, text, align = 'top' }: { enabled?: boolean, children: ReactNode, text: string, align?: Alignment }) {
    let alignmentClasses: string;
    
    switch(align) {
        case 'left':
            alignmentClasses = "right-full top-1/2 -translate-y-1/2 mr-2";
            break;
        case 'right':
            alignmentClasses = "left-full top-1/2 -translate-y-1/2 ml-2";
            break;
        case 'bottom':
            alignmentClasses = "left-1/2 top-full -translate-x-1/2 mt-2";
            break;
        default: // 'top'
            alignmentClasses = "left-1/2 bottom-full -translate-x-1/2 mb-2";
            break;
    }

    return (
        <div className="relative group">
            <div className={`absolute transform ${alignmentClasses} hidden group-hover:block bg-gray-950 text-white text-xs rounded py-1 px-2 z-10 min-w-60
                ${enabled ? "visible" : "invisible"}
            `}>
                {text}
            </div>
            {children}
        </div>
    );
}