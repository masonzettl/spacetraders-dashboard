import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Tooltip from "./Tooltip";

export default function CodeBlock({ className, code }: { className?: string, code: string }) {
    const [openTooltip, setOpenTooltip] = useState(false);

    function clipboardClick() {
        setOpenTooltip(true);
        navigator.clipboard.writeText(code);
    }

    return (
        <div className={`bg-gray-800 text-gray-400 px-2 py-1 rounded-md overflow-scroll relative min-h-14 ${className}`}>
            <div className="absolute bottom-2 right-2">
                <Tooltip text="Copied to clipboard!" enabled={openTooltip} align={"left"}>
                    <button onClick={clipboardClick} className="bg-gray-800 border-gray-300 hover:bg-gray-600 p-1 border rounded-md text-gray-300 transition-colors">
                        <ClipboardDocumentListIcon className="size-6" />
                    </button>
                </Tooltip>
            </div>
            {code}
        </div>
    )
}