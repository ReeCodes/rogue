PlayerEvents.tick(event => {
	const { player } = event;
	if (player.level.clientSide || player.age % (12 * 20) !== 0) return;
	
	if (!global.armorSets) return;
	
	let head = player.headArmorItem.id;
	let chest = player.chestArmorItem.id;
	let legs = player.legsArmorItem.id;
	let feet = player.feetArmorItem.id;

	for (let j = 0; j < global.armorSets.length; j++) {
		let set = global.armorSets[j];
        let applies = false;

		if (!set.partial) {
			if (head === set.head && 
                chest === set.chestplate && 
                legs === set.leggings && 
                feet === set.boots) {
				applies = true;
			}
		} else {
			if (head === set.partial || 
                chest === set.partial || 
                legs === set.partial || 
                feet === set.partial) {
				applies = true;
			}
		}
		
		if (applies) {
			for (let i = 0; i < set.effects.length; i++) {
				let eff = set.effects[i];
				player.potionEffects.add(eff.effect, 16 * 20, eff.amp, true, false);
			}
		}
	}
})