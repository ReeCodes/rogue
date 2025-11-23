//priority: 1100

// Determines how mobs are scaled if played on a server, otherwise does nothing when played with only 1 player

// Default: HARD; Possibles modes: BALANCED, HARD
// HARD: When a mob is spawned close to multiple players, picks the player with the highest coefficient near that mob.
// BALANCED: When a mob is spawned close to multiple players, divides total coefficient by the amount of nearby players.
// MAYHEM: Soon...

const SET_SERVER_MODE = 'BALANCED';