function setCoef(coefTolerance, maxCoef) {
	PlayerEvents.tick(event => {
		const {player, server} = event;
		if (player.age % 200 == 0) {
			
			//FACTORS
			let pAdvTotal = server.advancements.allAdvancements.stream().filter(adv => player.isAdvancementDone(adv.id)).toList().size() || 0;
			let pArmorToughness = player.getAttributeValue('minecraft:generic.armor_toughness') || 0;
			let pArmor = player.getAttributeValue('minecraft:generic.armor') || 0;
			let pHealth = player.maxHealth || 0;
			let pMagicDamage = player.getAttributeValue('lodestone:magic_damage') || 0;
			let pAttackDMG = player.getAttributeValue('minecraft:generic.attack_damage') || 0;
			
			let coefAttributes = (pArmorToughness * 0.8) + (pArmor * 0.75) + (pHealth * 0.3) + (pAdvTotal * 0.04) + (pMagicDamage * 0.35) + (pAttackDMG * 0.35);
			let coef = (coefAttributes) * coefTolerance;
			
			if (coef < 1.001) coef = 1;
			coef = Math.min(coef, maxCoef);
			
			player.persistentData.coef = coef;
		}
	})
};

setCoef(0.12, 20);