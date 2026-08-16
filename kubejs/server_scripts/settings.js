//priority: 2000

/*
	Determines how mobs are scaled if played on a server, otherwise does nothing when played with only 1 player

	Default: BALANCED
	Available Modes: BALANCED, HARD, MAYHEM
	
	BALANCED: 
	* When a mob is spawned close to multiple players, divides total coefficient by the amount of nearby players.
	
	HARD: 
	* When a mob is spawned close to multiple players, picks the player with the highest coefficient near that mob.
	* Chance of Skeletons spawning with special arrows are increased
	
	MAYHEM:
	* Chance of Skeletons spawning with special arrows are increased
	* Uses HARD mob spawning scaler for Multiplayer
	* Steeper scaling curve — coef rises faster for the same attribute gains
	* Non-hostiles including tamed mobs get 50% reduced stats (Default: 33%)
*/

const SET_SERVER_MODE = 'BALANCED';

/*
	Determines how the coef checking is executed.
	
	false = the coef value of a player is being checked every minute for every player and each time the player is granted an achievement
	true = the coef value of a player is only being checked each time the player is granted an achievement
*/

const doResourcefulChecking = false;


/*
	Logs spawned mobs with debug information
*/

const mobScalingDebugger = false;