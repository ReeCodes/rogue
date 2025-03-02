//UNLOCKS MOBS BASED ON COEF
function unlockSpawn(minimumCoef, entityType, isMultipleEntities) {
	EntityEvents.spawned(event => {
		
		const {server, entity} = event
		if (server.players.length === 0) return;
		
		server.players.forEach(player => {
			if (player.persistentData.coef < minimumCoef) {
				if (!isMultipleEntities) {
					if (entity.type == entityType) {
						event.cancel();
					}
				} else {
					if (entityType.test(entity.type)) {
						event.cancel();
					}
				}
			}
		})
	})
};

const specialMobs = new RegExp('specialmobs:(?!creeper$|zombie$|drowned$|zombifiedpiglin$|skeleton$|witherskeleton$|slime$|magmacube$|spider$|cavespider$|silverfish$|enderman$|witch$|ghast$|blaze$).*');
const mutantMobs = new RegExp('mutantmonsters:.*');
const grimoire = new RegExp('grimoireofgaia:.*');

//unlockSpawn(1.75, specialMobs, true);
unlockSpawn(4, mutantMobs, true);
unlockSpawn(3, grimoire, true);
unlockSpawn(4, 'irons_spellbooks:necromancer', false);