function addProtection(potionEffect) {
	PlayerEvents.respawned(event => {
		let player = event.player;
		let potency = (potionEffect == 'cofh_core:true_invisibility') ? 0 : 2 + getPlayerCoef(player);
		let potionDuration = 30 * 20;
		player.potionEffects.add(potionEffect, potionDuration, potency, true, false);
	});
	if (potionEffect !== 'cofh_core:true_invisibility') {
		PlayerEvents.loggedIn(event => {
			let player = event.player;
			let potency = 3 + getPlayerCoef(player);
			let potionDuration = 50 * 20;
			player.potionEffects.add(potionEffect, potionDuration, potency, true, false);
		});
	}
}

addProtection('minecraft:resistance');
addProtection('cofh_core:true_invisibility');