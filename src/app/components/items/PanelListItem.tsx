import { ReactNode } from "react";

export default function PanelListItem({ title, children }: { title: string, children: ReactNode }) {
  return (
      <li className="flex space-x-2 justify-between bg-gray-600 bg-opacity-30">
        <div className="font-bold bg-gray-600 px-2 py-0.5 h-fit">
          {title}
        </div>
        <div className="bg-gray-800 px-2 py-0.5 max-w-[75%]">
          {children}
        </div>
      </li>
  );
}