export const newtonTimeTitle = "Aynı sürede kuvvet, ivme ve hız";
export const newtonTimeExampleTitle = "Kuvvet iki katına çıkınca";
export const newtonVelocityTitle = "İki denemenin hız–zaman grafiği";
export const newtonDisplacementTitle = "Başlangıçtan ne kadar uzaklaştı?";
export const newtonMass = 2;
export const newtonDuration = 3;
export const newtonForces = [4, 8] as const;

export function newtonTimeAt(force: number, seconds: number) {
  const acceleration = force / newtonMass;
  const velocity = acceleration * seconds;
  return { force, acceleration, velocity, displacement: (velocity * seconds) / 2 };
}

export const newtonTimeRows = newtonForces.map((force) => {
  const motion = newtonTimeAt(force, newtonDuration);
  return [
    String(motion.force),
    String(motion.acceleration),
    String(motion.velocity),
    String(motion.displacement),
  ];
});
