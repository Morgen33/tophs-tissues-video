export const WIN_CHANCE = 0.2;

/**
 * Front-end win roll for prototype pulls.
 *
 * TODO: Replace with server-side randomness / VRF for production fairness.
 * TODO: Add anti-bot protection before allowing rolls.
 * TODO: Add limited supply check before returning true.
 */
export function rollForBooger(): boolean {
  return Math.random() < WIN_CHANCE;
}
