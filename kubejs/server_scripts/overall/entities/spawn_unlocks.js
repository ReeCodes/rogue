/*
	ENABLES / DISABLES SPAWNS BASED ON COEF
*/

function unlockSpawn(event, minimumCoef, entityType) {
	const { level, entity } = event;
	if (level.players.length === 0 && level.players.filter(p => !p.persistentData || !p.persistentData.coef)) return;
	level.players.forEach(player => {
		if (getPlayerCoef(player) < minimumCoef) {
			if (entityType.test(entity.type)) {
				event.cancel();
			}
		}
	})
};

const atThree = new RegExp('mutantmonsters:.*|irons_spellbooks:necromancer');
const atTwo = new RegExp('grimoireofgaia:.*');

EntityEvents.spawned(event => {
	unlockSpawn(event, 3, atThree);
	unlockSpawn(event, 2, atTwo);
});