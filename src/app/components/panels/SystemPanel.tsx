import { TokenContext } from "@/app/context/TokenContext";
import { getSystem, System } from "@/app/lib/spacetraders/systemsApi";
import { MouseEvent, useContext, useEffect, useState, WheelEvent } from "react";
import BasePanel from "./BasePanel";

export default function SystemPanel({ symbol }: { symbol: string }) {
  const token = useContext(TokenContext);

  const [system, setSystem] = useState({} as System);

  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [translate, setTranslate] = useState({ x: 450, y: 350 });
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSystem({ token, symbol });

      if ('symbol' in data)
        setSystem(data);
    }

    fetchData();
  }, [token]);

  useEffect(() => {
    console.log(system);
  }, [system]);

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setStartPoint({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false);
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - startPoint.x;
    const dy = e.clientY - startPoint.y;

    setTranslate(prev => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));

    setStartPoint({ x: e.clientX, y: e.clientY });
  }

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const scaleFactor = 0.005;
    const newScale = Math.min(Math.max(0.8, scale + e.deltaY * -scaleFactor), 8);
    setScale(newScale);
  }

  return (
    <BasePanel title={`System ${symbol}`} className="w-1/2">
      <svg viewBox="0 0 900 700" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} onWheel={handleWheel} className="cursor-move">
        <rect fill="black" width='100%' height='100%'></rect>
        <g transform={`translate(${translate.x}, ${translate.y}) scale(${scale})`}>
          <g id="rings">
            {system.waypoints?.map(waypoint => 
              <circle key={waypoint.symbol} stroke="gray" strokeWidth='0.25' strokeOpacity='0.25' fill="none" cx='0' cy='0' r={Math.sqrt(Math.pow(waypoint.x / 2, 2) + Math.pow(waypoint.y / 2, 2))}></circle>
            )}
          </g>
          <g id="waypoints">
            {system.waypoints?.map(waypoint =>
              <g key={waypoint.symbol}>
                <circle fill="white" cx={waypoint.x / 2} cy={waypoint.y / 2} r='1.5' onMouseOver={e => console.log(waypoint.symbol)}></circle>
                {/* <text x={waypoint.x / 2 + 2.5} y={waypoint.y / 2 + 0.8} fill="white" fontSize="2" className="font-thin">{waypoint.symbol}</text> */}
              </g>
            )}
          </g>
        </g>
      </svg>
    </BasePanel>
  );
}