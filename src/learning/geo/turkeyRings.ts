import { decodeRings } from "./decodeRings";
import { TURKEY_RINGS, TURKEY_SCALE } from "./turkeyData";

export const turkeyRings = () => decodeRings(TURKEY_RINGS, TURKEY_SCALE);
