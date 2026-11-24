export function reflectedDistanceM(speedMS: number, roundTripSeconds: number) {
  return speedMS * roundTripSeconds / 2;
}
