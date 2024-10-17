import { ReactNode } from "react";

export default function PanelList({ children }: { children: ReactNode }) {
    return (
        <ul className="space-y-0.5">
            {children}
        </ul>
    );
}