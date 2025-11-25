function getAttValue(player, attName) {
    let val = player.getAttributeValue(attName);
    return (typeof val === "number" && !isNaN(val)) ? val : 0;
}

function setPlayerCoef(player, server) {
	
    // FACTORS
	let PLAYER_MAX_HEALTH = player.maxHealth || 0;
    let PLAYER_ADVANCMENTS = server.advancements.allAdvancements
        .stream()
        .filter(adv => player.isAdvancementDone(adv.id))
        .toList().size() || 0;

    let PLAYER_ATTRIBUTES = 
	(getAttValue(player, 'minecraft:generic.armor_toughness') * 0.3) + 
	(getAttValue(player, 'minecraft:generic.armor') * 0.3) + 
	(PLAYER_MAX_HEALTH * 0.23) + 
	((PLAYER_ADVANCMENTS - 40) * 0.025) + 
	(getAttValue(player, 'lodestone:magic_damage') * 0.2) + 
	(getAttValue(player, 'puffish_attributes:magic_damage') * 0.2) +
	(getAttValue(player, 'minecraft:generic.attack_damage') * 0.25) +
	(getAttValue(player, 'attributeslib:cold_damage') * 0.125) +
	(getAttValue(player, 'attributeslib:fire_damage') * 0.125) +
	(getAttValue(player, 'attributeslib:crit_damage') * 0.19) +
	(getAttValue(player, 'puffish_attributes:tamed_damage') * 0.18);
	
    PLAYER_ATTRIBUTES /= COEF_DIVISOR;

    let coef = Math.pow(PLAYER_ATTRIBUTES, COEF_TOLERANCE);
    if (coef < 1.001) coef = 1;
    return Math.min(coef.toFixed(4), getMaxPlayerCoef(player));
}

PlayerEvents.tick(event => {
    const { player, server } = event;
    if (player.age % 160 !== 0) return;
    player.persistentData.coef = setPlayerCoef(player, server);
});