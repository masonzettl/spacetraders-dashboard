import { ErrorResponse, QueryParameters, sendRequest } from "./baseApi"
import { FactionSymbol } from "./factionsApi"
import { WaypointType } from "./systemsApi"
import { TradeSymbol } from "./tradingApi"

export interface Ship {
    symbol: string
    registration: ShipRegistration
    nav: ShipNav
    crew: ShipCrew
    frame: ShipFrame
    reactor: ShipReactor
    engine: ShipEngine
    cooldown: Cooldown
    modules: ShipModule[]
    mounts: ShipMount[]
    cargo: ShipCargo
    fuel: ShipFuel
}

export interface ShipRegistration {
    name: string
    factionSymbol: FactionSymbol
    role: ShipRole
}

export interface ShipNav {
    systemSymbol: string
    waypointSymbol: string
    route: ShipNavRoute
    status: ShipNavStatus
    flightMode: ShipNavFlightMode
}

export interface ShipNavRoute {
    destination: ShipNavRouteWaypoint
    origin: ShipNavRouteWaypoint
    departureTime: string
    arrival: string
}

export interface ShipNavRouteWaypoint {
    symbol: string
    type: WaypointType
    systemSymbol: string
    x: number
    y: number
}

export interface ShipCrew {
    current: number
    required: number
    capacity: number
    rotation: ShipCrewRotation
    morale: number
    wages: number
}

export interface ShipFrame {
    symbol: ShipFrameSymbol
    name: string
    description: string
    condition: number
    integrity: number
    moduleSlots: number
    mountingPoints: number
    fuelCapacity: number
    requirements: ShipRequirements
}

export interface ShipReactor {
    symbol: ShipReactorSymbol
    name: string
    description: string
    condition: number
    integrity: number
    powerOutput: number
    requirements: ShipRequirements
}

export interface ShipEngine {
    symbol: ShipEngineSymbol
    name: string
    description: string
    condition: number
    integrity: number
    speed: number
    requirements: ShipRequirements
}

export interface Cooldown {
    shipSymbol: string
    totalSeconds: number
    remainingSeconds: number
    expiration?: string
}

export interface ShipModule {
    symbol: ShipModuleSymbol
    capacity?: number
    range?: number
    name: string
    description: string
    requirements: ShipRequirements
}

export interface ShipMount {
    symbol: ShipMountSymbol
    name: string
    description?: string
    strength?: string
    desposits?: ShipMountDeposit[]
    requirements: ShipRequirements
}

export interface ShipRequirements {
    power?: number
    crew?: number
    slots?: number
}

export interface ShipCargo {
    capacity: number
    units: number
    inventory: ShipCargoItem[]
}

export interface ShipCargoItem {
    symbol: TradeSymbol
    name: string
    description: string
    units: number
}

export interface ShipFuel {
    current: number
    capacity: number
    consumed?: {
        amount: number
        timestamp: string
    }
}

enum ShipCrewRotation {
    'STRICT',
    'RELAXED'
}

enum ShipFrameSymbol {
    'FRAME_PROBE',
    'FRAME_DRONE',
    'FRAME_INTERCEPTOR',
    'FRAME_RACER',
    'FRAME_FIGHTER',
    'FRAME_FRIGATE',
    'FRAME_SHUTTLE',
    'FRAME_EXPLORER',
    'FRAME_MINER',
    'FRAME_LIGHT_FREIGHTER',
    'FRAME_HEAVY_FREIGHTER',
    'FRAME_TRANSPORT',
    'FRAME_DESTROYER',
    'FRAME_CRUISER',
    'FRAME_CARRIER'
}

enum ShipReactorSymbol {
    'REACTOR_SOLAR_I',
    'REACTOR_FUSION_I',
    'REACTOR_FISSION_I',
    'REACTOR_CHEMICAL_I',
    'REACTOR_ANTIMATTER_I'
}

enum ShipEngineSymbol {
    'ENGINE_IMPULSE_DRIVE_I',
    'ENGINE_ION_DRIVE_I', 'ENGINE_ION_DRIVE_II',
    'ENGINE_HYPER_DRIVE_I'
}

enum ShipModuleSymbol {
    'MODULE_MINERAL_PROCESSOR_I',
    'MODULE_GAS_PROCESSOR_I',
    'MODULE_CARGO_HOLD_I', 'MODULE_CARGO_HOLD_II', 'MODULE_CARGO_HOLD_III',
    'MODULE_CREW_QUARTERS_I',
    'MODULE_ENVOY_QUARTERS_I',
    'MODULE_PASSENGER_CABIN_I',
    'MODULE_MICRO_REFINERY_I',
    'MODULE_ORE_REFINERY_I',
    'MODULE_FUEL_REFINERY_I',
    'MODULE_SCIENCE_LAB_I',
    'MODULE_JUMP_DRIVE_I', 'MODULE_JUMP_DRIVE_II', 'MODULE_JUMP_DRIVE_III',
    'MODULE_WARP_DRIVE_I', 'MODULE_WARP_DRIVE_II', 'MODULE_WARP_DRIVE_III',
    'MODULE_SHIELD_GENERATOR_I', 'MODULE_SHIELD_GENERATOR_II'
}

enum ShipMountSymbol {
    'MOUNT_GAS_SIPHON_I', 'MOUNT_GAS_SIPHON_II', 'MOUNT_GAS_SIPHON_III',
    'MOUNT_SURVEYOR_I', 'MOUNT_SURVEYOR_II' ,'MOUNT_SURVEYOR_III',
    'MOUNT_SENSOR_ARRAY_I', 'MOUNT_SENSOR_ARRAY_II', 'MOUNT_SENSOR_ARRAY_III',
    'MOUNT_MINING_LASER_I', 'MOUNT_MINING_LASER_II', 'MOUNT_MINING_LASER_III',
    'MOUNT_LASER_CANNON_I',
    'MOUNT_MISSILE_LAUNCHER_I',
    'MOUNT_TURRET_I'
}

enum ShipMountDeposit {
    'QUARTZ_SAND',
    'SILICON_CRYSTALS',
    'PRECIOUS_STONES',
    'ICE_WATER',
    'AMMONIA_ICE',
    'IRON_ORE',
    'COPPER_ORE',
    'SILVER_ORE',
    'ALUMINIUM_ORE',
    'GOLD_ORE',
    'PLATINUM_ORE',
    'DIAMONDS',
    'URANITE_ORE',
    'MERITIUM_ORE'
}

export enum ShipRole {
    'FABRICATOR',
    'HARVESTER',
    'HAULER',
    'INTERCEPTOR',
    'EXCAVATOR',
    'TRANSPORT',
    'REPAIR',
    'SURVEYOR',
    'COMMAND',
    'CARRIER',
    'PATROL',
    'SATELLITE',
    'EXPLORER',
    'REFINERY'
}

export enum ShipNavStatus {
    'IN_TRANSIT',
    'IN_ORBIT',
    'DOCKED'
}

export enum ShipNavFlightMode {
    'DRIFT',
    'STEALTH',
    'CRUISE',
    'BURN'
}

export async function listShips({ token, parameters }: { token: string, parameters?: QueryParameters }): Promise<Ship[] | ErrorResponse> {
    const url = `https://api.spacetraders.io/v2/my/ships
        ${parameters?.limit ? `?limit=${parameters.limit}` : ""}
        ${parameters?.page ? `?page=${parameters.page}` : ""}
    `;

    const response = await sendRequest<Ship[]>({
        method: 'GET',
        token: token,
        url: url
    });

    return response;
}

export async function getShip({ token, shipSymbol }: { token: string, shipSymbol: string }): Promise<Ship | ErrorResponse> {
    const url = `https://api.spacetraders.io/v2/my/ships/${shipSymbol}`;

    const response = await sendRequest<Ship>({
        method: 'GET',
        token: token,
        url: url
    });

    return response;
}