import { Trail, PawPrint } from '../types';

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
export function generateTrail(trailId: number, startId: number): Trail {
  const stepCount = 22; // Hangalttai urt zam

  // 1. Sanamsargüi ehlah tseg (Dörvön taliin ali negees)
  const edge = Math.floor(Math.random() * 4);
  let sx: number, sy: number, angle: number;

  switch (edge) {
    case 0: // DEEREEES DOORHOO
      sx = 10 + Math.random() * 80;
      sy = -5;
      angle = 90;
      break;
    case 1: // DOOROOS DEESHEE
      sx = 10 + Math.random() * 80;
      sy = 105;
      angle = 270;
      break;
    case 2: // ZÜÜNEES BARUUN
      sx = -5;
      sy = 10 + Math.random() * 80;
      angle = 0;
      break;
    default: // BARUUNAAS ZÜÜN
      sx = 105;
      sy = 10 + Math.random() * 80;
      angle = 180;
      break;
  }

  const prints: PawPrint[] = [];
  let cx = sx;
  let cy = sy;
  let dir = (angle * Math.PI) / 180;

  // ALHAANII PARAMETERS
  const stepLength = 7.5; // Alhaanii urt (Hoironduur zai)
  const straddle = 2.8; // ZÜÜN BARUUN HÖL (Ene ni davhardaxaas sergiilne)

  for (let i = 0; i < stepCount; i++) {
    // Chigleliig mash baga zereg xelbelzüülne (Tahir bolgoh)
    dir += ((Math.random() - 0.5) * Math.PI) / 12;

    cx += Math.cos(dir) * stepLength;
    cy += Math.sin(dir) * stepLength;

    const isLeft = i % 2 === 0;
    // HÖL SOLIX: Höl bür tushig tsegneesee züün esvel baruun tiish garah yostoi
    const lateralAngle = dir + (isLeft ? -Math.PI / 2 : Math.PI / 2);

    prints.push({
      id: startId + i,
      x: cx + Math.cos(lateralAngle) * straddle,
      y: cy + Math.sin(lateralAngle) * straddle,
      rotation: (dir * 180) / Math.PI - 90,
      size: 50 + Math.random() * 10, // Hemjee tsegtslelt
      isLeft,
    });
  }
  return { id: trailId, prints };
}
