PlayerEvents.tick(event => {
	const {player, server} = event
	if (player.age % 160 == 0) {

		let pHeadArmor = player.getHeadArmorItem().id
		let pChestArmor = player.getChestArmorItem().id
		let pLegsArmor = player.getLegsArmorItem().id
		let pFeetArmor = player.getFeetArmorItem().id

		for (let j = 0; j < global.armorSets.length; j++) {
			let armorSet = global.armorSets[j];
			if (!armorSet.partial) {
				if (pHeadArmor == armorSet.head && pChestArmor == armorSet.chestplate && pLegsArmor == armorSet.leggings && pFeetArmor == armorSet.boots) {
					for (let i = 0; i < armorSet.effects.length; i++) {
						let armorEffects = armorSet.effects[i];
						player.potionEffects.add(armorEffects.effect, 12*20, armorEffects.amp, true, false);
					}
				}
			} else {
				if (pHeadArmor == armorSet.partial || pChestArmor == armorSet.partial || pLegsArmor == armorSet.partial || pFeetArmor == armorSet.partial) {
					for (let i = 0; i < armorSet.effects.length; i++) {
						let armorEffects = armorSet.effects[i];
						player.potionEffects.add(armorEffects.effect, 12*20, armorEffects.amp, true, false);
					}
				}
			}
		}
	}
})