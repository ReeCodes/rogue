function addProtection(potionEffect) {
	PlayerEvents.respawned(event => {
		let player = event.player;
		let potency = 1 + Math.floor(player.persistentData?.coef ?? 1);
		let potionDuration = 30 * 20;
		player.potionEffects.add(potionEffect, potionDuration, potency, true, false);
	});
	PlayerEvents.loggedIn(event => {
		let player = event.player;
		let potency = 3 + Math.floor(player.persistentData?.coef ?? 1);
		let potionDuration = 30 * 20;
		player.potionEffects.add(potionEffect, potionDuration, potency, true, false);
	});
}

addProtection('minecraft:resistance');