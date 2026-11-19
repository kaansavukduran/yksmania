import { decodeRings, type Ring } from "./decodeRings";
import { LAND_RINGS } from "./worldData";
import { TURKEY_RINGS, TURKEY_SCALE } from "./turkeyData";

export type { Ring };
export const landRings = () => decodeRings(LAND_RINGS);
export const turkeyRings = () => decodeRings(TURKEY_RINGS, TURKEY_SCALE);
