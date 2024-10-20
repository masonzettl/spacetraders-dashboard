import MarketPanel from "../components/panels/MarketPanel";

export default function Trading({ waypointSymbol }: { waypointSymbol: string }) {
    const systemSymbol = waypointSymbol.split("-", 2).join("-");

    return (
        <>
            <h1 className="text-5xl font-bold my-4">Trading</h1>

            <MarketPanel systemSymbol={systemSymbol} waypointSymbol={waypointSymbol} />
        </>
    );
}